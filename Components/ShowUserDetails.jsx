import { useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { ShowFeedbacks } from "./ShowFeedbacks";
import { ShowUsers } from "./ShowUsers";

export function ShowUserDetails() {
  const [showFeedback, setShowFeedback] = useState(false);

 
  return (
    <div style={{height:"100vh"}}>
      <ShowUsers />

      <Row className="text-center mt-3">
        <Col lg={12}>
          <Button
            variant="primary"
            onClick={() => setShowFeedback(!showFeedback)}
          >
            {showFeedback ? "Hide Feedbacks" : "Show Feedbacks"}
          </Button>
        </Col>
      </Row>
      {showFeedback ?<div className="mt-3">
          <ShowFeedbacks />
        </div> : null} 
    
    </div>
  );
}

