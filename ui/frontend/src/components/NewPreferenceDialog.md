## Examples

```jsx
const user = {
    username: 'example-user',
    display_name: 'Example User',
};

const profile = {
    is_anonymous: false,
    ...user,
};

const preference = {
    user,
    allow_capture: true,
    request_hold: true,
    expressed_at: "2019-01-29T16:53:51.984321Z",
};

<div>
    <h1>Default preference</h1>
    <NewPreferenceDialog profile={ profile } />
    <h1>Existing preference</h1>
    <NewPreferenceDialog profile={ profile } existingPreference={ preference }/>
</div>
```
