# react-google-tag-manager

This repository contains a react based implementation for
Google's Tag Manager [snippet](https://developers.google.com/tag-manager/quickstart).

## Motivation & Expectation

We like to use **G**oogle's **T**ag **M**anager in our React Stack. We wrap it into a component because 
it makes it testable. And based on our agreement every component needs to be tested. 

Other requirements for the GTM implementation are:

1. provide a GTM-ID
1. provide additional events on script initialization (optional)
1. provide a name for the datalayer (optional)
1. works for server-side-rendering and client-side-rendering
1. contains tests
1. installable via npm
