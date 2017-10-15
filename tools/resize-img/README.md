# `resize-img`

CLI tool for scaling down images based on a set of maximum dimensions. Created because WordPress has an 8MB limit for individual files, and images of this size are almost never useful.

## Installation

```sh
npm install -g @bacc/tools
```

## Options

There are two modes for use:

- `stdio`: read the image from `stdin` and write the modified image to `stdout`.
- `batch`: read all files from a directory, and write all modified images (with the same names) to a new directory.

| Option     | Alias | Description                              |
| ---------- | ----- | ---------------------------------------- |
| `--stdio`  |       | Use `stdio` mode to process a single image |
| `--width`  | `-w`  | Maximum width for scaling the image      |
| `--height` | `-h`  | Maximum height for scaling the image     |
| `--in`     | `-i`  | (`batch` mode) Directory containing source images to be scaled |
| `--out`    | `-o`  | (`batch` mode) Directory to write all modified images |

## Examples

```sh
# stdio mode:
resize-img --stdio -w 1000 -h 1000 < input.jpg > output.jpg

# batch mode:
resize-img -w 1000 -h 1000 --in large-images/ --out smaller-images/
```
