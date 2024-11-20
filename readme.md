# 📦 fetchuy - A Reusable Fetch Utility

**fetchuy** is a lightweight and reusable utility for making HTTP requests (GET, POST, PUT, etc.) with support for caching, retries, and a React hook. It provides an easy-to-use way to handle API requests across your JavaScript and React applications.

## 📥 Installation

Install the package using npm:

```bash
npm install fetchuy
```

## 🌟 Features
- **Simple Fetching Abstraction:**
  - Convenient functions for GET, POST, and other HTTP methods.
  - Automatic error handling.
- **React Hook (`useFetch`):**
  - Built-in state management (`loading`, `error`, `data`).
  - Memory leak prevention with cleanup.
- **Caching:**
  - Avoid redundant API calls with built-in caching.
- **Retry Logic:**
  - Automatically retry failed requests with customizable attempts.
- **Lightweight & Fast:**
  - Built with `fetch` and minimal dependencies.
- **SSR & Client-Side Compatible:**
  - Perfect for frameworks like Next.js or traditional React apps.



## 🚀 Getting Started
### 1. Basic Fetching
```javascript
import { fetchuy } from 'fetchuy';

fetchuy('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```
### 2. React Hook: `useFetch`
``` javascript
import { useFetch } from 'fetchuy';

const MyComponent = () => {
  const { data, error, loading } = useFetch('https://api.example.com/data');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>Data: {JSON.stringify(data)}</div>;
};
```

### 3. Caching with `useCache`
``` javascript
import { useCache } from 'fetchuy';

const fetchData = () => fetchuy('https://api.example.com/data');

useCache('data_key', fetchData)
  .then(data => console.log('Cached data:', data))
  .catch(error => console.error('Error:', error));
  ```

### 4. Retry Logic
``` javascript
import { retryFetch } from 'fetchuy';

const fetchData = () => fetchuy('https://api.example.com/data')

retryFetch(fetchData, 3, 1000)
  .then(data => console.log('Data:', data))
  .catch(error => console.error('Error:', error));
```

## 📚 API Documentation

### `fetchuy(url, options = {})`
A reusable function for making HTTP requests. It wraps the native `fetch` API with added convenience, such as default headers, credentials, and error handling.

**Parameters:**
- `url` (string): The URL to send the request to.
- `options` (object): Configuration options for the fetch request. These options are merged with the default options and passed to the native `fetch` function. You can override the default headers, method, or any other fetch option here.

**Default Options:**
``` javascript
const defaultOptions = {
  method: 'GET',  // Default method is GET
  headers: {
    'Content-Type': 'application/json',
  },
};
```
**Common `options` parameters:**
- `method` (string): The HTTP method to use (e.g., `'GET'`, `'POST'`, `'PUT'`, `'DELETE'`).
- `headers` (object): Custom headers for the request (e.g., `{ 'Authorization': 'Bearer token' }`).
- `body` (string | FormData | Blob): The body of the request (only for `POST` and `PUT` methods).
- `credentials` (string): Controls whether cookies are sent with the request.
  
**Returns:**
- A `Promise` that resolves with the parsed JSON response data.

**Example Usage:**
```javascript
// Making a GET request
fetchuy('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Making a POST request with custom headers and body
const postData = {
  name: 'John Doe',
  age: 30
};

fetchuy('https://api.example.com/submit', {
  method: 'POST',
  body: JSON.stringify(postData),
  headers: {
    'Authorization': 'Bearer token'
  }
})
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
  ```

### `useFetch(url, options = {})`
A React hook for fetching data in functional components. It manages the loading, error, and data states internally.

**Parameters:**
- `url` (string): The URL to fetch data from.
- `options` (object): Additional options to pass to the `fetchuy` function. These options are merged with the default ones.
  
**Returns:**
- An object containing:
  - `data` (any | null): The response data, or `null` if not yet fetched.
  - `error` (string | null): Any error message, or `null` if no error.
  - `loading` (boolean): A boolean that indicates whether the request is still loading.
  - 
**Example Usage:**
```javascript
import { useFetch } from 'fetchuy';

const MyComponent = () => {
  const { data, error, loading } = useFetch('https://api.example.com/data');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>Data: {JSON.stringify(data)}</div>;
};
```
**Custom Options in `useFetch`:**

The `options` parameter in `useFetch` works the same as the `options` in `fetchuy`. You can use it to customize the request, for example, by changing the HTTP method or adding custom headers.

**Example Usage with Custom Options:**
```javascript
import { useFetch } from 'fetchuy';

const MyComponent = () => {
  const { data, error, loading } = useFetch('https://api.example.com/data', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer token'
    },
    body: JSON.stringify({ name: 'John' }),
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>Data: {JSON.stringify(data)}</div>;
};
``` 
## Option Overview for `useFetch` and `fetchuy`
The options parameter can be used to pass various configuration values to customize how the request is made. Here's a quick overview:
| Option        | Type              | Description                                                                 |
|---------------|-------------------|-----------------------------------------------------------------------------|
| `method`      | `string`          | The HTTP method to use (GET, POST, PUT, etc.). Default is `'GET'`.         |
| `headers`     | `object`          | Custom headers to send with the request. Example: `{ 'Authorization': 'Bearer token' }` |
| `body`        | `string` | FormData | Blob` | The body content of the request. Typically used with POST and PUT requests. |
| `credentials` | `string`          | Controls cookies in the request. `'same-origin'` by default. Set to `'include'` for cross-origin requests with credentials. |

---
### `useCache(key, fetchFn)`
A simple caching system to store API responses. This function checks if the requested data is in the cache before making a network request.

**Parameters:**
- `key` (string): The key for the cache.
- `fetchFn` (function): The function that fetches data.
  
**Returns:**
- A `Promise` that resolves with the cached data if available, or the result of the `fetchFn` if not.

**Example Usage:**
```javascript
import { useCache } from 'fetchuy';

const fetchData = () => fetchuy('https://api.example.com/data');

const cachedData = useCache('dataKey', fetchData);
cachedData.then(data => console.log(data));
```

### `retryFetch(fetchFn, retries = 3, delay = 1000)`
Retries a failed fetch request for a specified number of times with a delay between attempts.

**Parameters:**
- `fetchFn` (function): The fetch function to retry.
- `retries` (number): The number of retries before failing.
- `delay` (number): The delay between retries in milliseconds.

**Returns:**
- A `Promise` that resolves with the data after a successful request, or an error if all retries fail.
  
**Example Usage:**
```javascript
import { retryFetch } from 'fetchuy';

const fetchData = () => fetchuy('https://api.example.com/data');

retryFetch(fetchData, 3, 1000)
  .then(data => console.log(data))
  .catch(error => console.error('Failed after retries:', error));
```
# 📜 License
This project is licensed under the MIT License