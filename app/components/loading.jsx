import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <PacmanLoader
            color="#000000"
            size={55}
            speedMultiplier={1}
            />
        </div>
    )
}

export default Loading
