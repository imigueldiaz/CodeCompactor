# CodeCompactor

CodeCompactor is a command-line tool that effortlessly condenses and prepares your codebase for seamless analysis by online Large Language Models (LLMs). It recursively traverses a specified directory, collects the contents of all non-binary files, and generates a single text file containing the relative paths and contents of each file. This makes it convenient to upload and analyze your entire codebase using online LLMs without the need to handle multiple files.

Of course you can use it for any other purpose you want, like sharing a codebase with someone else, or just to have a single file with all your code.

More features and improvements are planned for future releases, so stay tuned!

## Features

- Recursively traverses a directory and its subdirectories
- Collects the contents of all non-binary files
- Generates a single text file with relative file paths and contents
- Supports excluding specific files and directories
- Handles binary files by skipping them
- Automatically resolves naming conflicts for the output file

## Installation

To install CodeCompactor globally, use the following command:

```bash
npm install -g codecompactor
```

## Usage

To generate a condensed file tree, run the following command:

```bash
generate-file-tree <folderPath> [excludeList...]
```

This command will generate a text file named after the input directory (e.g., `project.txt`) in the current working directory. The file will contain the relative paths and contents of all non-binary files within the specified directory, excluding the "node_modules" directory, files with the ".log" extension, and directories named "temp".

## Output Format

The generated text file will have the following format:

```plaintext
relative/path/to/file1.js

file1 contents... 

relative/path/to/file2.py

file2 contents...
```


Each file's relative path is followed by its contents, separated by a newline character. Binary files are skipped and not included in the output.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the [GitHub repository](https://github.com/your-username/codecompactor). If you'd like to contribute code, please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

CodeCompactor was inspired by the need to simplify the process of uploading and analyzing codebases using online LLMs. It builds upon the power of Node.js and the npm ecosystem to provide a convenient and efficient solution.

It is inspired by [@BradMyrick](https://github.com/BradMyrick/goFlat) and his project goFlat.

I have no idea of Go, so I decided to create a similar project in Node.js.


## Contact

If you have any questions or inquiries, please contact the project maintainer at imigueldiaz@gmail.com or fork the repository and submit a pull request. You can add an issue to the repository if you have any questions or suggestions.



