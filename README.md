# Spotter Exercise

## Project Overview

Spotter Exercise is a project built with React 18. To ensure compatibility with certain dependencies, a specific npm configuration is required before installing the project dependencies.

## Prerequisites

### Legacy Peer Dependencies

Before installing the project dependencies, you need to configure npm to handle legacy peer dependencies. This is necessary because `@material-ui/core` has not yet been updated to support React 18.

Run the following command to set the appropriate npm configuration:

```sh
npm config set legacy-peer-deps true
```

Once the npm configuration is set, you can install the project dependencies using one of the following commands:

```sh
npm install