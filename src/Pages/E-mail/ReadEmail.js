import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
    Card,
    CardBody,
    Row,
    Container,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Spinner
} from "reactstrap";

import InboxSidebar from "./Sidebar";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { emailCategories } from './mockEmails';
import { AiFunction } from './AI';

const ReadEmail = () => {
    document.title = "Read Email | Email Client";
    
    const location = useLocation();
    const emailData = location.state?.emailData || {
        from: "Unknown Sender",
        email: "no-email@example.com",
        subject: "No Subject",
        content: "No content available",
        date: "No date",
        category: "work",
        attachments: []
    };

    // States
    const [folderbtn, setFolderbtn] = useState(false);
    const [tagbtn, setTagbtn] = useState(false);
    const [menubtn, setMenubtn] = useState(false);
    const [aiResponseModal, setAiResponseModal] = useState(false);
    const [selectedTone, setSelectedTone] = useState('formal');
    const [generatedResponse, setGeneratedResponse] = useState('');
    const [subject, setSubject] = useState(`Re: ${emailData.subject}`);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [btnLoading, setbtnLoading] = useState(false)

    // Response tones configuration
    const responseTones = {
        friendly: { label: 'Friendly', badge: 'success' },
        casual: { label: 'Casual', badge: 'info' },
        humor: { label: 'Humor', badge: 'warning' },
        formal: { label: 'Formal', badge: 'primary' }
    };

    const handleGenerateResponse = async (tone) => {
        try
        { if (btnLoading)
            return
        setbtnLoading(true)
        setEditorState(EditorState.createEmpty())
        setSelectedTone(tone);
        const result = await AiFunction(emailData, tone)
        setbtnLoading(false)
        
  
        const contentState = ContentState.createFromText(result);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
    }
    catch(error)
    {
     console.log(error)
     setbtnLoading(false)

    }
    };

    const handleRegenerateResponse = async() => {
       try
       { if (btnLoading)
            return
        setbtnLoading(true)
        setEditorState(EditorState.createEmpty())
        const result = await AiFunction(emailData, selectedTone)
        setbtnLoading(false)
        
        const contentState = ContentState.createFromText(result);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
       }
       catch(error)
       {
        console.log(error)
        setbtnLoading(false)

       }
    };

    const onEditorStateChange = (newState) => {
        setEditorState(newState);
    };

    const formatContent = (content) => {
        return content.split('\n').map((paragraph, index) => (
            paragraph.trim() && (
                <p key={index} className="text-muted mb-2">{paragraph}</p>
            )
        ));
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid={true}>
                    <Breadcrumbs title="Email" breadcrumbItem="Read Email" />
                    <Row>
                        <InboxSidebar />
                        <div className="col-xl-9">
                            {/* Email Actions Toolbar */}
                            <div className="d-flex flex-wrap justify-content-between mb-3">
                                <div className="btn-toolbar" role="toolbar">
                                    <div className="btn-group me-2 mb-3">
                                        <Button 
                                            color="primary" 
                                            className="waves-light waves-effect"
                                            onClick={() => setAiResponseModal(true)}
                                        >
                                            <i className="fa fa-reply me-1"></i> AI Reply
                                        </Button>
                                        <Button color="primary" className="waves-light waves-effect">
                                            <i className="fa fa-forward"></i>
                                        </Button>
                                        <Button color="primary" className="waves-light waves-effect">
                                            <i className="far fa-trash-alt"></i>
                                        </Button>
                                    </div>

                                    <div className="btn-group me-2 mb-3">
                                        <Dropdown isOpen={folderbtn} toggle={() => setFolderbtn(!folderbtn)}>
                                            <DropdownToggle color="primary" caret>
                                                <i className="fa fa-folder me-1"></i>
                                                <i className="mdi mdi-chevron-down" />
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>Move to Archive</DropdownItem>
                                                <DropdownItem>Move to Spam</DropdownItem>
                                                <DropdownItem>Move to Trash</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>

                                <Link to="/inbox" className="btn btn-secondary mb-3">
                                    <i className="mdi mdi-arrow-left me-1"></i> Back to Inbox
                                </Link>
                            </div>

                            {/* Email Content Card */}
                            <Card>
                                <CardBody>
                                    {/* Email Header */}
                                    <div className="d-flex mb-4">
                                        <div className="flex-grow-1">
                                            <h4 className="font-size-16 mb-1">{emailData.from}</h4>
                                            <p className="text-muted font-size-13">
                                                <i className="mdi mdi-email me-1"></i> {emailData.email}
                                            </p>
                                            <p className="text-muted font-size-13 mb-0">
                                                <i className="mdi mdi-calendar me-1"></i> {emailData.date}
                                                {emailData.category && emailCategories[emailData.category] && (
                                                    <span className={`badge bg-${emailCategories[emailData.category].badge} ms-2`}>
                                                        {emailCategories[emailData.category].label}
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email Subject */}
                                    <h4 className="font-size-16">{emailData.subject}</h4>

                                    {/* Email Content */}
                                    <div className="mt-4">
                                        {formatContent(emailData.content)}
                                    </div>

                                    {/* Attachments Section */}
                                    {emailData.attachments && emailData.attachments.length > 0 && (
                                        <div className="mt-4 pt-3 border-top">
                                            <h5 className="font-size-15 mb-3">
                                                <i className="fa fa-paperclip me-2"></i> 
                                                Attachments ({emailData.attachments.length})
                                            </h5>
                                            <div className="d-flex flex-wrap gap-2">
                                                {emailData.attachments.map((file, index) => (
                                                    <div key={index} className="border rounded p-2">
                                                        <div className="d-flex align-items-center">
                                                            <div className="flex-shrink-0 me-3">
                                                                <div className="avatar-sm">
                                                                    <div className="avatar-title bg-light text-primary rounded">
                                                                        <i className="far fa-file"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-grow-1">
                                                                <h5 className="font-size-14 mb-1">{file}</h5>
                                                                <p className="text-muted font-size-13 mb-0">12 MB</p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-3">
                                                                <Link to="#" className="text-muted">
                                                                    <i className="fas fa-download"></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </CardBody>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </div>

            {/* AI Response Modal with Email Compose */}
            <Modal isOpen={aiResponseModal} toggle={() => setAiResponseModal(!aiResponseModal)} size="lg">
                <ModalHeader toggle={() => setAiResponseModal(!aiResponseModal)}>
                    Generate AI Response
                </ModalHeader>
                <ModalBody>
                    {/* Tone Selection */}
                    <div className="mb-3">
                        <h5 className="mb-3">Select Response Tone:</h5>
                        <div className="btn-group">
                            {Object.entries(responseTones).map(([key, value]) => (
                              <>{<Button
                                    key={key}
                                    color={selectedTone === key ? value.badge : 'light'}
                                    onClick={() => handleGenerateResponse(key)}
                                    className="me-2"
                                >
                                    {value.label}
                                </Button>}</>  
                            ))}
                        </div>
                    </div>
        {btnLoading && (
            <div className="text-center mt-3">
                <Spinner color="primary" /> 
                <p>Generating response...</p>
            </div>
        )}

                    {/* Email Compose Section */}
                    <div className="mt-3">
                        <Card className="mb-0">
                            <CardBody>
                                <div className="mb-3">
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="To" 
                                        value={emailData.email}
                                        readOnly
                                    />
                                </div>

                                <div className="mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="Subject" 
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>

                                <div id="email-editor" style={{ minHeight: "360px" }}>
                                    <Form method="post">
                                        <Editor
                                            editorState={editorState}
                                            onEditorStateChange={onEditorStateChange}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName border rounded px-2"
                                            placeholder="Select a tone to generate a response..."
                                            toolbar={{
                                                options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji'],
                                                inline: {
                                                    options: ['bold', 'italic', 'underline', 'strikethrough'],
                                                },
                                            }}
                                        />
                                    </Form>
                                </div>

                                <div className="btn-toolbar mt-3">
                                    <div>
                                        <button type="button" className="btn btn-success waves-effect waves-light me-1"
                                                onClick={handleRegenerateResponse}>
                                            <i className="fas fa-redo me-1"></i> Regenerate
                                        </button>
                                        <button className="btn btn-primary waves-effect waves-light">
                                            <span>Send</span> <i className="fab fa-telegram-plane ms-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
};

export default ReadEmail;