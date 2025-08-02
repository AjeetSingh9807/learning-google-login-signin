"use client";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { app } from "@/app/firebaseConnect";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const auth = getAuth(app);
    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push("/SignupPage"); // Redirect to login page if not logged in
            }
        });

        return () => unsubscribe();
    }, [auth, router]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.push("/SignupPage");
        } catch (error: any) {
            console.error("Logout error:", error.message);
        }
    };

    if (!user) {
        return null; // or loading spinner
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="text-center">
                        <Card.Body>
                            <img
                                src={user.photoURL || "/default-avatar.png"} // fallback image
                                alt="Profile"
                                className="rounded-circle mb-3"
                                width={100}
                                height={100}
                            />
                            <h4>{user.displayName || "No name provided"}</h4>
                            <p>{user.email}</p>
                            <Button variant="danger" onClick={handleLogout}>
                                Log Out
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
