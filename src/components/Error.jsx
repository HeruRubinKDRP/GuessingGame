import {useNavigate} from "react-router-dom";

export default function Error() {
    const navigate = useNavigate();

    return (
        <main className="page">
            <section className="arcade-card">
                <h2>No game started</h2>
                <button className="primary-button" onClick={() => navigate("/")}>
                    Go to Start
                </button>
            </section>
        </main>
    );
}