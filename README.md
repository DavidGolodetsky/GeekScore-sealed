# geek

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# docker build --target setup-stage -t vue-app .
# docker run -it -p 8080:8080 -v ${PWD}/src:/app/src vue-app nom run serve
# docker run -it vue-app nom run test:unit