import {
  Button,
  Table,
  Row,
  Container,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import moment, { updateLocale } from "moment";

import calendarArray from "./Cal";
import { useState, useEffect } from "react";

function App() {
  const bookedDates = ["2022-06-24", "2022-06-25", "2022-06-26"];

  const [focusDay, setFocusDate] = useState(moment().startOf("month"));
  const [checkIn, setCheckIn] = useState("");
  const [nights, setNumNights] = useState(0);

  console.log(checkIn);

  function decrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.subtract(1, "month"));
  }

  function incrementFocus() {
    const date = focusDay.clone();
    setFocusDate(date.add(1, "month"));
  }

  const calendar = calendarArray(focusDay);
  const rows = calendar.length / 7;
  const newRows = [];
  for (let i = 0; i < rows; i++) {
    newRows.push(i);
  }

  function test(item) {
    setCheckIn(item.format("YYYY-MM-DD"));
  }

  return (
    <Container>
      <Row>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            border: "1px solid black",
            marginTop: "40px",
          }}
        >
          <Button
            onClick={decrementFocus}
            disabled={
              focusDay.clone().subtract(1, "month") <
              moment().startOf("month").toDate()
            }
          >
            Back
          </Button>
          <h3> {focusDay.format("MMMM YYYY")}</h3>
          <Button onClick={incrementFocus}>Forward</Button>
        </div>
        <div style={{ border: "1px solid black" }}>
          <Table style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>

            <tbody>
              {newRows.map((val) => (
                <tr key={val}>
                  {calendar.slice(val * 7, val * 7 + 7).map((item) => {
                    if (item.format("M") !== focusDay.format("M")) {
                      return (
                        <td style={{ backgroundColor: "lightgrey" }} key={item}>
                          {item.format("DD")}
                        </td>
                      );
                    } else {
                      if (bookedDates.includes(item.format("YYYY-MM-DD"))) {
                        return (
                          <td style={{ backgroundColor: "red" }} key={item}>
                            {item.format("DD")}
                          </td>
                        );
                      } else {
                        return (
                          <td key={item}>
                            <Button
                              variant="link"
                              style={{ textDecoration: "none", padding: "0px" }}
                              onClick={() => {
                                test(item);
                              }}
                            >
                              {item.format("DD")}
                            </Button>{" "}
                          </td>
                        );
                      }
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Row>
      <Row>
        <InputGroup style={{ padding: "0px", border: "1px solid black" }}>
          <InputGroup.Text>Check In</InputGroup.Text>
          <FormControl
            defaultValue={checkIn}
            onChange={(event) => {
              setCheckIn(event.target.value);
            }}
          />
          <InputGroup.Text>Nights</InputGroup.Text>
          <FormControl
            type="number"
            max="7"
            min="0"
            onChange={(event) => {
              setNumNights(Number(event.target.value));
            }}
          />
          <Button
            disabled={
              !/^\d{4}-\d{2}-\d{2}$/g.test(checkIn) || nights < 1 || nights > 7
            }
          >
            Go
          </Button>
        </InputGroup>
      </Row>
    </Container>
  );
}

export default App;
