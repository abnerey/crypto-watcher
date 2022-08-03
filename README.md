# Crypto Chart Watcher

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Imagine you're on a team with a more junior developer who has a cool idea for a product that allows you to track cryptocurrencies and see their price movements. He's got a proof of concept but needs help cleaning it up.

## DEMO

If you want to check this right away [click here](https://coin-watcher-abnerey.web.app)

## Running the App

Runs the app in the development mode using `yarn start`
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## The Task

We need your help getting this app ready for production.

Your tasks:

### Drag and Drop

- Implement the proper drag n drop functionality, such that dragging a card into the "Watch" list will remove it from "Possible Coins" and vice versa. It should work like the functionality here: https://react-beautiful-dnd.netlify.app/?path=/story/board--simple

### Charts

- Use the CoinStats API to fetch the historical price data for each coin on the watch list
- Populate the "Charts" section of the screen with a list of charts, showing the 1 year price history for each coin on the watch list - use a chart library of your choice
- Dragging a coin from the "Watch List" and back to "Possible Coins" should remove its chart from the "Charts" section

### Code Cleanup

This code is a mess. Please help us organize it better so other developers can understand it more easily.

### Bonus

If you want, you can figure out how to store the state of "watch list" vs "possible coins" so that users can return to their watch list even after they close the tab.

## Technical Analysis

### TODOs

- [x] implement cross-column drag and drop (remove / insert)
- [x] implement intra-column drag and drop (reorder)
- [x] (Columns) implement background colors with style that changes when dragging (https://react-beautiful-dnd.netlify.app/?path=/story/board--simple)
- [x] TODO: implement conditional style depending on dragging status
- [x] Persist the state

### The Stack

- Async/Server State
    - [React Query](https://tanstack.com/query/v4/docs/overview)
- Charts
    - [react-chartjs-2](https://github.com/reactchartjs/react-chartjs-2)
- Data
    - [CoinStatsAPI](https://documenter.getpostman.com/view/5734027/RzZ6Hzr3#948fea46-e93a-47f8-93d8-915583f7406d)
- Hosting
    - Firebase

### The Folder Structure

- components/
    - The place where you want to have your UI Units (atoms) that are going to be shared. These are not supposed to have any async behaviour and favor stateless over stateful patterns.
- features/
    - The place where you want to have your presentational (molecules) components. These are self contained features, they hold the async and stateful behaviour and can have their own set of units. They can be seen as a micro organism, so they can have a folder structure similar to the main project.
- pages/
    - The place where you want to have what describes a page or a layout (organism). These are also self contained and can have their own structure with the exception that their components should come from `features` or `components`, since pages are supposed to orchestrate features. Pages highly relates to an application's routes.
- shared/
    - config
        - Where all the constants lies
    - hooks
        - Hooks that are shared across the project
    - lib
        - Shared utility functions 
    - types
        - The source of the types. Any major, non JSX related types should be added here as this is 

### Technical Decisions

- Why react-chartjs-2? 
    - It uses `chart.js` underneath, what has proven to be one of the most reliable and robust chart libraries from a long time ago.
- Why using custom hooks for async behaviour? 
    - A component by itself shouldn't be aware of how to get its data, data has to come from data sources like props, context, hooks, etc. By extracting async calls into custom hooks we get better abstractions and delegation of concerns, it also enables a better migration to new libraries in the future.
- Why import aliases?
    - Having all the major set of folders configured as TS aliases lets the developers to think in terms of "libraries", thus they can easily describe what they need when developing a component. This is the foundation of a design system that can be potentially separated in the future.

### Patterns Involved

- [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)
    - This is what I used to plan the folder structure
- [Prop Getter](https://kentcdodds.com/blog/how-to-give-rendering-control-to-users-with-prop-getters)
    - This is the pattern that uses Draggable and Droppable components
    