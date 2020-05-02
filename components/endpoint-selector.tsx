import { RefObject } from "react";

type EndpointSelectorProps = {
    endpoints: string[],
    onAddEndpoint: (endpoint: string) => void,
    onRemoveEndpoint: (endpoint: string) => void,
};

export function EndpointSelector(props: EndpointSelectorProps) {
    let addEndpointInputRef: RefObject<HTMLInputElement>;

    function handleSubmit(event) {
        event.preventDefault();

        const newEndpoint = addEndpointInputRef.current.value;
        if (!props.endpoints.includes(newEndpoint)) {
            props.onAddEndpoint(newEndpoint);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input ref={addEndpointInputRef}></input>
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