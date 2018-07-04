# hexo-assets

fix all hexo markdown related assets automatically

# Usege

```shell
npm install hexo-assets --save
```

# Example

Make sure `post_asset_folder: true` in your `_config.yml`.

Just use as simple markdown:

## directory tree

```shell
markdown-post
├── archive.zip
└── image.png
markdown-post.md
```

## in your post
```markdown
# Test Assets
[archive](markdown-post/archive.zip)
![image](markdown-post/image.png)
```
