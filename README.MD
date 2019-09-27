# Before writing code

- Use yarn.
- Enable editor config in your editor.
- Enable tslint in your editor.

# Running tests

For tests to run correctly with IntelliJ you must change the run configuration 
to contain the correct options (have a look in package.json for options used).

Example: `--require ts-node/register -r tsconfig-paths/register --file test/setup.js`

# Commit code and pushing

Before commit or push the linter and tests are run. If something fails the action is aborted.
So enable linting, ensure tests are passing and coverage >= 90%.
