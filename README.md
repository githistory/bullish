# Bullish Bank


## Setup Steps

This assumes that you already have the latest versions of nodejs and its toolings installed.

### 1. Once cloned, install dependencies

```
yarn install
```

### 2. Generate dynamic libs

```
yarn prisma:generate
```

### 3. Create DB and seed it by running

```
yarn prisma:migrate
```

### 4. Run the app

```
yarn dev
```
