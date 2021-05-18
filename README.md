# expenses-service

## Expenses service with rest apis for the expenses solution

### Local environment setup
 - Install MongoDB community edition and configure localhost mongo server
 - Install latest Node LTS version
 - Open the terminal with functions directory
 - Install dependencies by executing ```npm install``` command
 - Open the code in Visual Studio Code
 - Create `.env` file under functions directory
 - Add the following configurations to the env file.
   ```
   NODE_ENV=LOCAL
   ```
#### Firebase enabled environment
 - To run the service with firebase enabled, install the firebase-tools using ```npm install -g firebase-tools```
 - Login to firebase using ```firebase login```
 
### How to run
 - Follow the Local environment setup mentioned above.
 - With firebase enabled, execute ```npm run serve``` to run the node service as server.
 - For development,execute ```npm run start:watch``` to run the service as nodemon server in watch mode.
 - Check the scripts added in package.json for more options.

**Increment version, tag and git push**
 - Minor version update
    ```npm version minor --force -m "Some message to commit"```
 - Patch version update
    ```npm version patch --force -m "Some message to commit"```