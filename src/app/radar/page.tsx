'use client'

import { useState, useEffect, useMemo } from 'react'
import { useDebounce } from '@/lib/hooks'
import Link from 'next/link'
import SignalCard from '@/components/SignalCard'
import { mockSignals, sourceLabels } from '@/data/mockSignals'
import type { Signal } from '@/types/signal'

const ALL_SOURCES = [
  'all',
  'producthunt',
  'hackernews',
  'twitter',
  'github',
  'indiehackers',
  'v2ex',
  'xiaohongshu',
  'juejin',
  'medium',
]

const SORT_OPTIONS = [
  { value: 'score-desc', label: '综合评分高→低' },
  { value: 'hot-desc', label: '热度高→低' },
  { value: 'novelty-desc', label: '创新高→低' },
  { value: 'business-desc', label: '商业高→低' },
  { value: 'local-desc', label: '本地化高→低' },
  { value: 'newest', label: '最新' },
]

const SCORE_CHIPS = [
  { label: '全部', value: 0 },
  { label: '80+', value: 80 },
  { label: '70+', value: 70 },
  { label: '60+', value: 60 },
]

function getSourceLabel(source: string): string {
  if (source === 'all') return '全部源'
  return sourceLabels[source] || source
}

export default function RadarPage() {
  const [selectedSources, setSelectedSources] = useState<string[]>(ALL_SOURCES)
  const [sortBy, setSortBy] = useState<string>('score-desc')
  const [minScore, setMinScore] = useState<number>(0)
  const [searchInput, setSearchInput] = useState('')
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  const searchQuery = useDebounce(searchInput, 300)
  const [filterOpen, setFilterOpen] = useState(false)

  const showAllSources =
    selectedSources.includes('all') ||
    ALL_SOURCES.filter((s) => s !== 'all').every((s) => selectedSources.includes(s))

  // Fetch signals from API, fall back to mockSignals on error/empty
  useEffect(() => {
    const fetchSignals = async () => {
      setLoading(true)
      try {
        const params = new URLSearchParams({
          sortBy,
          limit: '50',
        })
        if (!showAllSources) {
          const activeSources = selectedSources.filter((s) => s !== 'all')
          if (activeSources.length > 0) {
            params.set('source', activeSources.join(','))
          }
        }
        if (minScore > 0) params.set('minScore', String(minScore))
        if (searchQuery) params.set('search', searchQuery)

        const res = await fetch(`/api/signals?${params}`)
        const data = await res.json()

        if (data.success && data.data?.length > 0) {
          setSignals(data.data)
        } else {
          setSignals(mockSignals)
        }
      } catch (error) {
        console.error('Failed to fetch signals:', error)
        setSignals(mockSignals)
      } finally {
        setLoading(false)
      }
    }

    fetchSignals()
  }, [selectedSources, sortBy, minScore, searchQuery, showAllSources])

  // Client-side filtering + sorting
  const filteredSignals = useMemo(() => {
    let result = [...signals]

    // Filter by selected sources
    if (!showAllSources) {
      const activeSources = selectedSources.filter((s) => s !== 'all')
      result = result.filter((s) => activeSources.includes(s.source))
    }

    // Filter by minScore
    if (minScore > 0) {
      result = result.filter((s) => (s.finalScore ?? 0) >= minScore)
    }

    // Filter by search query (title, description, tags)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((s) => {
        const inTitle = s.title?.toLowerCase().includes(q)
        const inDesc = s.description?.toLowerCase().includes(q)
        const inTags = s.tags?.some((t) => t.toLowerCase().includes(q))
        return inTitle || inDesc || inTags
      })
    }

    // Sort
    switch (sortBy) {
      case 'score-desc':
        result.sort((a, b) => (b.finalScore ?? 0) - (a.finalScore ?? 0))
        break
      case 'hot-desc':
        result.sort((a, b) => (b.hotScore ?? 0) - (a.hotScore ?? 0))
        break
      case 'novelty-desc':
        result.sort((a, b) => (b.noveltyScore ?? 0) - (a.noveltyScore ?? 0))
        break
      case 'business-desc':
        result.sort((a, b) => (b.businessScore ?? 0) - (a.businessScore ?? 0))
        break
      case 'local-desc':
        result.sort((a, b) => (b.localScore ?? 0) - (a.localScore ?? 0))
        break
      case 'newest':
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
    }

    return result
  }, [signals, selectedSources, minScore, searchQuery, sortBy, showAllSources])

  const toggleSource = (source: string) => {
    setSelectedSources((prev) => {
      if (prev.includes(source)) {
        return prev.filter((s) => s !== source)
      }
      return [...prev, source]
    })
  }

  const selectAllSources = () => setSelectedSources(ALL_SOURCES)
  const clearAllSources = () => setSelectedSources([])

  return (
    <div className="flex w-full" style={{ height: 'calc(100dvh - 56px)' }}>
      {/* Left Sidebar - Source Filter */}
      <aside
        className="hidden md:flex flex-col border-r"
        style={{
          width: '260px',
          backgroundColor: 'var(--color-bg-elevated)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div
          className="flex items-center justify-between px-4 py-4 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <h2
            className="text-sm font-semibold"
            style={{ color: 'var(--color-text)' }}
          >
            信号源
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={selectAllSources}
              className="text-xs transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              全选
            </button>
            <span style={{ color: 'var(--color-text-muted)' }}>/</span>
            <button
              onClick={clearAllSources}
              className="text-xs transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
            >
              全部不选
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          <ul className="space-y-1">
            {ALL_SOURCES.map((source) => {
              const checked = selectedSources.includes(source)
              return (
                <li key={source}>
                  <label
                    className="flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer transition-colors"
                    style={{
                      backgroundColor: checked
                        ? 'var(--color-primary-subtle)'
                        : 'transparent',
                    }}
                    onMouseEnter={(e) => {
                      if (!checked) {
                        e.currentTarget.style.backgroundColor =
                          'var(--color-bg-hover)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!checked) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                  >
                    <span
                      className="flex items-center justify-center flex-shrink-0 rounded-sm"
                      style={{
                        width: '14px',
                        height: '14px',
                        backgroundColor: checked
                          ? 'var(--color-primary)'
                          : 'transparent',
                        border: checked
                          ? 'none'
                          : '1.5px solid var(--color-text-muted)',
                      }}
                    >
                      {checked && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M2.5 6.5L5 9L9.5 3.5"
                            stroke="var(--color-text-inverse)"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSource(source)}
                      className="sr-only"
                    />
                    <span
                      className="text-sm"
                      style={{
                        color: checked
                          ? 'var(--color-text)'
                          : 'var(--color-text-secondary)',
                      }}
                    >
                      {getSourceLabel(source)}
                    </span>
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>

      {/* Right Main Content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="max-w-3xl mx-auto px-4 py-5 lg:px-8">
          {/* Mobile filter button */}
          <div className="md:hidden mb-4">
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 3.5h12M4.5 8h7M6.5 12.5h3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <span>筛选</span>
              {selectedSources.length > 0 && !selectedSources.includes('all') && (
                <span
                  className="flex items-center justify-center rounded-full text-xs"
                  style={{
                    minWidth: '18px',
                    height: '18px',
                    padding: '0 5px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text-inverse)',
                  }}
                >
                  {selectedSources.length}
                </span>
              )}
              {selectedSources.includes('all') && (
                <span
                  className="flex items-center justify-center rounded-full text-xs"
                  style={{
                    minWidth: '18px',
                    height: '18px',
                    padding: '0 5px',
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text-inverse)',
                  }}
                >
                  {ALL_SOURCES.length - 1}
                </span>
              )}
            </button>
          </div>

          {/* Toolbar */}
          <div
            className="flex flex-col sm:flex-row gap-3 mb-5 pb-4 border-b"
            style={{ borderColor: 'var(--color-border)' }}
          >
            {/* Search input */}
            <div className="relative flex-1">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="7"
                    cy="7"
                    r="5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M11 11L14 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="搜索信号名称、概念、技术..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full rounded-md py-2 pl-9 pr-3 text-sm focus:outline-none transition-colors"
                style={{
                  backgroundColor: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--color-border-active)'
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--color-border)'
                }}
              />
            </div>

            {/* Sort select */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md px-3 py-2 text-sm focus:outline-none transition-colors cursor-pointer"
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--color-border-active)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--color-border)'
              }}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Score filter chips */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {SCORE_CHIPS.map((chip) => {
              const active = minScore === chip.value
              return (
                <button
                  key={chip.value}
                  onClick={() => setMinScore(chip.value)}
                  className="px-3 py-1 rounded-full text-xs font-medium filter-chip"
                  style={{
                    backgroundColor: active
                      ? 'var(--color-primary)'
                      : 'var(--color-bg-surface)',
                    color: active
                      ? 'var(--color-text-inverse)'
                      : 'var(--color-text-secondary)',
                    border: active
                      ? 'none'
                      : '1px solid var(--color-border)',
                  }}
                >
                  {chip.label}
                </button>
              )
            })}
          </div>

          {/* Result count */}
          <div className="mb-4">
            <span
              className="text-xs"
              style={{ color: 'var(--color-text-muted)' }}
            >
              共 {filteredSignals.length} 条信号
            </span>
          </div>

          {/* Signal cards */}
          {loading ? (
            <div
              className="flex flex-col items-center justify-center py-16"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <div
                className="animate-spin rounded-full mb-4"
                style={{
                  width: '32px',
                  height: '32px',
                  border: '2px solid var(--color-primary)',
                  borderTopColor: 'transparent',
                }}
              />
              <p className="text-sm">加载中...</p>
            </div>
          ) : filteredSignals.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-16"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm mb-1">没有找到匹配的信号</p>
              <p className="text-xs">试试调整筛选条件</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredSignals.map((signal, index) => (
                <SignalCard
                  key={signal.id}
                  signal={signal}
                  rank={sortBy === 'score-desc' ? index + 1 : undefined}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile filter bottom sheet */}
      {filterOpen && (
        <div className="md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 z-50"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setFilterOpen(false)}
          />
          {/* Bottom sheet panel */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 flex flex-col rounded-t-xl"
            style={{
              maxHeight: '60vh',
              backgroundColor: 'var(--color-bg-elevated)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <h2
                className="text-sm font-semibold"
                style={{ color: 'var(--color-text)' }}
              >
                信号源
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={selectAllSources}
                  className="text-xs transition-colors"
                  style={{ color: 'var(--color-primary)' }}
                >
                  全选
                </button>
                <span style={{ color: 'var(--color-text-muted)' }}>/</span>
                <button
                  onClick={clearAllSources}
                  className="text-xs transition-colors"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  全部不选
                </button>
                <span
                  className="mx-1"
                  style={{ color: 'var(--color-border)' }}
                >
                  |
                </span>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="text-xs transition-colors"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  关闭
                </button>
              </div>
            </div>

            {/* Source list */}
            <div className="overflow-y-auto px-4 py-3">
              <ul className="space-y-1">
                {ALL_SOURCES.map((source) => {
                  const checked = selectedSources.includes(source)
                  return (
                    <li key={source}>
                      <label
                        className="flex items-center gap-2.5 px-2 py-2 rounded-md cursor-pointer transition-colors"
                        style={{
                          backgroundColor: checked
                            ? 'var(--color-primary-subtle)'
                            : 'transparent',
                        }}
                      >
                        <span
                          className="flex items-center justify-center flex-shrink-0 rounded-sm"
                          style={{
                            width: '14px',
                            height: '14px',
                            backgroundColor: checked
                              ? 'var(--color-primary)'
                              : 'transparent',
                            border: checked
                              ? 'none'
                              : '1.5px solid var(--color-text-muted)',
                          }}
                        >
                          {checked && (
                            <svg
                              width="10"
                              height="10"
                              viewBox="0 0 12 12"
                              fill="none"
                              aria-hidden="true"
                            >
                              <path
                                d="M2.5 6.5L5 9L9.5 3.5"
                                stroke="var(--color-text-inverse)"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleSource(source)}
                          className="sr-only"
                        />
                        <span
                          className="text-sm"
                          style={{
                            color: checked
                              ? 'var(--color-text)'
                              : 'var(--color-text-secondary)',
                          }}
                        >
                          {getSourceLabel(source)}
                        </span>
                      </label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
