## Examples

```jsx
const user = {
    username: 'example-user',
    display_name: 'Example User',
};

const preference = {
    user,
    allow_capture: true,
    request_hold: true,
    expressed_at: "2019-01-29T16:53:51.984321Z",
};

<div>
    <h1>No preference</h1>
    <UserPreference username={ user.username } />

    <h1>Existing preference</h1>
    <UserPreference username={ user.username } preference={ preference } />
</div>
```
