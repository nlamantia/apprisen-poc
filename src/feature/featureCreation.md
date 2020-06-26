## Steps to create a feature

### Background

A feature in this program is a set of files which handle storing and updating state around a topic. 

For example, the debt feature handles grabbing user debt information from the cloud and storing it in a place where components can subscribe to the information. 

This is done using two libraries, redux and saga.

Redux is a library which lets you define a state for your application, and code which modifies the state. 
It is different than most common paradigms in two ways:
1. A reducer never modifies state, only creates new versions of it 
2. A reducer doesn't interact with the rest of the program using function calls, but by being passed messages ('Actions')

[docs](https://redux.js.org/introduction/getting-started)

Saga is a library that works with redux to provide a way to grab data from an api and push it to the reducer

[docs](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)

It's built around the concept of a generator, which is generally kind of tricky. Here's a decent guide on the subject

[guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)

### Steps


1. Figure out what data you need, create an interface 
 * This defines the shape of your data, and lets you ensure that wherever that data is being accessed or changed, it's formatted correctly. This is just like an interface in any typed language.
2. Figure out how you want to modify that data, create a reducer and actions
 * A reducer takes in actions and state, and outputs new state. Most common situation will be just putting data into teh store as is without any modifications (like a setter in java). 
 ** To do that, you would make an action that take s in the data you need as a parameter, then a case in your reducer which looks for that action and combines the data from the action with the current state, returning a new state
3. Connect our state to the api, create a saga
 * Generally, a saga will need to make an api call then create an action with the  return value of that call, which is then handled by a reducer
