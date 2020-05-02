export function EndpointSelector(props) {
    let addEndpointInputRef;

    function handleSubmit(event) {
        event.preventDefault();

        const newEndpoint = addEndpointInputRef.value;
        if (!props.endpoints.includes(newEndpoint)) {
            props.onAddEndpoint(newEndpoint);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={(r) => { addEndpointInputRef = r; }}></input>
                <input type="submit" value="add" />
            </form>
            <ul>
                {props.endpoints.map(endpoint => (
                    <li key={endpoint}>
                        {endpoint}
                        <button onClick={() => props.onRemoveEndpoint(endpoint)}>x</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}