import React, { useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Row,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

import { Link } from "react-router-dom";
import classnames from "classnames";
import InboxSidebar from "./Sidebar";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { mockEmails, emailCategories } from './mockEmails';

const Inbox = () => {
  document.title = "Inbox | Email Client";

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [folderbtn, setfolderbtn] = useState(false);
  const [tagbtn, settagbtn] = useState(false);
  const [menubtn, setmenubtn] = useState(false);

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  // Filter emails based on the active tab
  const getFilteredEmails = () => {
    switch (customActiveTab) {
      case "1": // Primary
        return mockEmails.filter(email => !email.category || email.category === 'work');
      case "2": // Social
        return mockEmails.filter(email => email.category === 'social');
      case "3": // Promotional
        return mockEmails.filter(email => email.category === 'marketing');
      default:
        return mockEmails;
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Email" breadcrumbItem="Inbox" />
          <Row>
            <InboxSidebar />
            <Col xl={9}>
              {/* Toolbar */}
              <div className="d-flex flex-wrap justify-content-between mb-3">
                <div className="btn-toolbar" role="toolbar">
                  <div className="btn-group me-2 mb-3">
                    <button type="button" className="btn btn-primary waves-light waves-effect">
                      <i className="fa fa-inbox"></i>
                    </button>
                    <button type="button" className="btn btn-primary waves-light waves-effect">
                      <i className="fa fa-exclamation-circle"></i>
                    </button>
                    <button type="button" className="btn btn-primary waves-light waves-effect">
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                  <div className="btn-group me-2 mb-3">
                    <Dropdown isOpen={folderbtn} toggle={() => setfolderbtn(!folderbtn)}>
                      <DropdownToggle className="btn" color="primary" caret>
                        <i className="fa fa-folder me-1"></i>
                        <i className="mdi mdi-chevron-down" />
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Updates</DropdownItem>
                        <DropdownItem>Social</DropdownItem>
                        <DropdownItem>Team Manage</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>

                <div className="btn-toolbar justify-content-md-end">
                  <div className="btn-group ms-md-2 mb-3">
                    <Dropdown isOpen={tagbtn} toggle={() => settagbtn(!tagbtn)}>
                      <DropdownToggle className="btn" color="primary" caret>
                        <i className="fa fa-tag me-1"></i>
                        <i className="mdi mdi-chevron-down" />
                      </DropdownToggle>
                      <DropdownMenu>
                        {Object.entries(emailCategories).map(([key, value]) => (
                          <DropdownItem key={key}>{value.label}</DropdownItem>
                        ))}
                      </DropdownMenu>
                    </Dropdown>
                  </div>

                  <div className="btn-group ms-2 mb-3">
                    <Dropdown isOpen={menubtn} toggle={() => setmenubtn(!menubtn)}>
                      <DropdownToggle className="btn" color="primary" caret>
                        More <i className="mdi mdi-dots-vertical ms-1"></i>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Mark as Unread</DropdownItem>
                        <DropdownItem>Mark as Important</DropdownItem>
                        <DropdownItem>Add to Tasks</DropdownItem>
                        <DropdownItem>Add Star</DropdownItem>
                        <DropdownItem>Mute</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </div>

              <Card className="mb-0">
                <CardBody>
                  {/* Email Category Tabs */}
                  <Nav tabs className="nav-tabs-custom nav-justified">
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customActiveTab === "1" })}
                        onClick={() => toggleCustom("1")}
                      >
                        <i className="mdi mdi-inbox me-2 align-middle font-size-18"></i>
                        <span className="d-none d-md-inline-block">Primary</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customActiveTab === "2" })}
                        onClick={() => toggleCustom("2")}
                      >
                        <i className="mdi mdi-account-group-outline me-2 align-middle font-size-18"></i>
                        <span className="d-none d-md-inline-block">Social</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ cursor: "pointer" }}
                        className={classnames({ active: customActiveTab === "3" })}
                        onClick={() => toggleCustom("3")}
                      >
                        <i className="mdi mdi-tag-multiple me-2 align-middle font-size-18"></i>
                        <span className="d-none d-md-inline-block">Promotional</span>
                      </NavLink>
                    </NavItem>
                  </Nav>

                  {/* Email List */}
                  <TabContent activeTab={customActiveTab} className="pt-3">
                    <TabPane tabId={customActiveTab}>
                      <ul className="message-list mb-0">
                        {getFilteredEmails().map((email) => (
                          <li key={email.id} className={email.isUnread ? "unread" : ""}>
                            <div className="col-mail col-mail-1">
                              <div className="checkbox-wrapper-mail">
                                <input type="checkbox" id={`chk${email.id}`} />
                                <label htmlFor={`chk${email.id}`} className="toggle"></label>
                              </div>
                              <span className="title">{email.from}</span>
                            </div>
                            <Link
                              to="/read-email"
                              state={{ emailData: email }}
                              className="col-mail col-mail-2"
                            >
                              <div className="subject">
                                {email.category && emailCategories[email.category] && (
                                  <span className={`bg-${emailCategories[email.category].badge} badge me-2`}>
                                    {emailCategories[email.category].label}
                                  </span>
                                )}
                                {email.subject} -{" "}
                                <span className="teaser">
                                  {email.content.slice(0, 100)}...
                                </span>
                              </div>
                              <div className="date">{email.date}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>

              {/* Pagination */}
              <Row className="mt-4">
                <div className="col-7">
                  Showing {getFilteredEmails().length} emails
                </div>
                <div className="col-5">
                  <div className="btn-group float-end">
                    <button type="button" className="btn btn-sm btn-success waves-effect">
                      <i className="fa fa-chevron-left"></i>
                    </button>
                    <button type="button" className="btn btn-sm btn-success waves-effect">
                      <i className="fa fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Inbox;