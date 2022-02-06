import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/noteActions";
import Loading from "../../Loading";
import ErrorMessage from "../../ErrorMessage";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import './CreateNote.css'

function CreateNote(){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const navigate = useNavigate()
  
    const dispatch = useDispatch();
  
    const noteCreate = useSelector((state) => state.noteCreate);
    const { loading, error, note } = noteCreate;

    const resetHandler = () => {
        setTitle("");
        setContent("");
    };

  const submitHandler = (e) => {
        e.preventDefault();
        if (!title || !content ) return;


        dispatch(createNoteAction(title, content))

        resetHandler();
        navigate("/mynotes");
    };

    return(
        <MainScreen title="Create a Note">
            <Card>
                <Card.Header>Create a new Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submitHandler} encType="multipart/form-data">
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            placeholder="Enter the title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        </Form.Group>

                        <Form.Group controlId="content">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={content}
                            placeholder="Enter the content"
                            rows={4}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}
                        {loading && <Loading size={50} />}
                        <Button type="submit" variant="primary" style={{marginTop: 20}}>
                            Create Note
                        </Button>
                        <Button className="mx-2" onClick={resetHandler} variant="danger" style={{marginTop: 20}}>
                            Reset Fields
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default CreateNote