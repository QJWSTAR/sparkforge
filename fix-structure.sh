#!/bin/bash
# Move all files from sparkforge-app/* to root and remove sparkforge-app directory

cd /Users/quanjiawei/Documents/sparkforge

# Move all files except .git to parent
mv sparkforge-app/* sparkforge-app/.* . 2>/dev/null || true

# Remove sparkforge-app directory
rmdir sparkforge-app

# Update .gitignore to include sparkforge-app if it was there
echo "Done! Files moved to root directory"

# Show new structure
ls -la
