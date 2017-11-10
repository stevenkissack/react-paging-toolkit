# react-paging-toolkit
Easy component based paging

# This is NOT a finished solution, but an experiment in progress. The aim of this project is to allow me to implement a uniform flexible paging style across all projects that I work on. I highly advise that if you want to use this library that you fix the version as to not suffer from breaking changes!

# Components

## Paginate
A wrapper that exposes the bare essentials for web app paging, this component is expected to change largely based on its usage

## PaginationControl
Can be used individually, see the Paginate & PaginateControl source to see usage

## Utilities
### WithPaging & WithUrlPaging
These calls wrap the initial constructor state initialisation to allow setup of the required paging object on the component state.
WithUrlPaging was build to parse the browsers query string for paging related variables (these are configurable as a second parameter)