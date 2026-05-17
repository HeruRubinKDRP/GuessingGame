view it working online:
https://herurubinkdrp.github.io/GuessingGame/

video demo:
https://youtu.be/rmBP0wldV-0

## **An array**

the app is built around using a series of timers, so these are kept in an array of objects
that each keep the desired properties for the timer to use.
view Data/starterWorkout for an example of the array of timers.

## **React JSX syntax**

all visualization components use JSX syntax to create the elements on the page, and to display the data from the timers array.

## **Form elements**

Using form elements for the user to modify the properties of each timer

## Interactive events

there are buttons and form elements for editing, reording, and modifying timers as well  as
starting/stopping/pausing timer chains.

## **React component**

"components" folder shows the use of React components to create reusable elements for the app, such as the Timer component, and the TimerChain component.

## **React module**

the app composes views dynamically by using modules.

## At least one React Hook

using a hook to manage localStorage for the timers array, and to trigger re-renders when the timers are modified.

Use of one of the following:
access an API

### access storage (database or local storage)
uses localStorage to save the timers array, so that the user's timers maintain across new sessions.

## React Routes
created explanatory home/start page and timers page, using React Router to navigate between them.