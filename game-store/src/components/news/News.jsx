import { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner } from "react-bootstrap";

const News = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3000/news")
            .then((res) => res.json())
            .then((data) => {
                setNews(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    }

    return (
        <Container className="py-5">
            <h1 className="text-center text-light mb-5">
                Seccion de Noticias
            </h1>

            <Row>
                {news.map((item) => (
                    <Col lg={4} md={6} className="mb-4" key={item.id}>
                        <Card className="h-100 bg-dark text-light border-secondary">
                            <Card.Img
                                variant="top"
                                src={item.image}
                                style={{
                                    height: "220px",
                                    objectFit: "cover",
                                }}
                            />

                            <Card.Body>
                                <Card.Title>
                                    {item.title}
                                </Card.Title>

                                <Card.Subtitle className="mb-2 text-muted">
                                    {item.source}
                                </Card.Subtitle>

                                <Card.Text>
                                    {item.content.length > 150
                                        ? item.content.substring(0, 150) + "..."
                                        : item.content}
                                </Card.Text>
                            </Card.Body>

                            <Card.Footer className="text-muted">
                                {new Date(
                                    item.publishedAt
                                ).toLocaleDateString()}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default News;