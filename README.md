**My Trip Planner** is an application for users to search for places based on search term and location. Users then can view places' rating and reviews and choose places to add to their timetables of trip activities. It was built with rails API back-end and react and redux front-end.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and semantic-ui react to implement application's layout.


## Usage Instruction

Firstly, Clone the back-end project: [Planner API](https://github.com/nhinhdao/planner-api)

Follow Instruction on set up and run the back-end application. Make sure to run `rails server -p 3001` to specify server port for loading back-end data.

This application gets data from [Yelp Fusion API](https://www.yelp.com/fusion) so in order for the search to return data, please go on [Yelp Fusion](https://www.yelp.com/fusion) to make an account and get access token. 
Then make an .env file with this key:

```REACT_APP_YELP_TOKEN=<you access token>```.

Back to terminal in this project directory, 

- Run: `npm install` to install all dependencies

- Run: `npm start` to start the application

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Account:

For a better experience, start this application by sign in using this account:

| Username: | robindao
| :-- | :-- |
| Password:  | nhinh12345


## Constribution

Bug reports and pull requests are welcome on GitHub at [Project management with react-redux](https://github.com/nhinhdao/project-management-with-react-redux). This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


