export function MyButton() {
    function handleClick() {
        alert('Clicked');
    }
    return (
        <button onClick={handleClick}>
            Click Me
        </button>
    );
}
