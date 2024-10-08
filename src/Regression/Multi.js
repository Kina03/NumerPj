import React from "react";
import { Container, Row, Col, Form, Card, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { GaussJordanReplace } from "../Regression/GJordan";

export default function Multi() {
    const [arrayX, setArrayX] = useState([[0,1,2]])
    const [arrayY, setArrayY] = useState([0,1,2]);
    const [targetX, setTargetX] = useState(0);
    const [result, setResult] = useState(0);


    // input controller
    const addX = ()=> {
        const newArray = [...arrayX];
        newArray.push(new Array(newArray[0].length).fill(0));
        setArrayX(newArray);
    }
    const removeX = ()=> {
        const newArray = [...arrayX];
        if (newArray.length > 1) {
            newArray.pop();
            setArrayX(newArray);
        }
    }
    const addRow = ()=> {
        const newArrayX = [...arrayX];
        const newArrayY = [...arrayY];
        for (let i = 0; i < newArrayX.length; i++) {
            newArrayX[i].push(0);
        }
        newArrayY.push(0);
        setArrayX(newArrayX);
        setArrayY(newArrayY);
    }
    const removeRow = ()=> {
        const newArrayX = [...arrayX];
        const newArrayY = [...arrayY];
        for (let i = 0; i < newArrayX.length; i++) {
            newArrayX[i].pop();
        }
        newArrayY.pop();
        setArrayX(newArrayX);
        setArrayY(newArrayY);
    }
    // input handler
    const inputX = (e, row, index)=> {
        const newArray = [...arrayX];
        newArray[row][index] = e.target.value;
        setArrayX(newArray);
    }
    const inputY = (e, index)=> {
        const newArray = [...arrayY];
        newArray[index] = e.target.value;
        setArrayY(newArray);
    }
    const inputTargetX = (e)=> {
        setTargetX(e.target.value);
    }

    const calculator = ()=> {
        let x = arrayX.map((set)=> set.map((data)=> parseFloat(data)));
        let y = arrayY.map((data)=> parseFloat(data));
        let m = x.length;

        const arr = Array.from({ length: m+1 }, () => Array(m+1).fill(0));
        let answer = []
        arr[0][0] = arrayX[0].length;

        for (let i = 1; i < m+1; i++) {
            let sumX = 0;
            for (let j = 0; j < y.length; j++) {
                sumX += x[i - 1][j];
            }
            arr[0][i] = sumX;
        }


        for (let i = 1; i < m+1; i++) {
            for (let j = 0; j < m+1; j++) {
                let sumX = 0;
                for (let k = 0; k < y.length; k++) {
                    if (j === 0) {
                        sumX += x[i-1][k];
                    } else {
                        sumX += x[j - 1][k] * x[i - 1][k];
                    }
                }
                arr[i][j] = sumX;
            }
        }

        for (let i = 0; i < m+1; i++) {
            let sumXY = 0;
            for (let j = 0; j < y.length; j++) {
                if (i === 0) {
                    sumXY += y[j];
                } else {
                    sumXY += y[j] * x[i - 1][j];
                }
            }
            answer[i] = sumXY;
        }
        function f(x) {
            let A = GaussJordanReplace(arr, answer);
            let resultX = A[0];
        
            for (let i = 1; i < A.length; i++) {
                resultX += A[i] * Math.pow(x, i);
            }
            console.log(A);
            return resultX;
        }
    }

    return (
        <Container>
            <center>
            <Card>
                <Card.Header><br/><h1>Multiple Least Squares</h1></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <Form.Label>Number of X</Form.Label>
                                <InputGroup>
                                    <Button variant="outline-primary" onClick={addX} className="w-50">&nbsp;&nbsp;Add x&nbsp;&nbsp;</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-danger" onClick={removeX} className="w-50">&nbsp;&nbsp;Remove x&nbsp;&nbsp;</Button>
                                </InputGroup>
                            </Col>
                            <Col>
                                <br/><Form.Label>Number of row (n)</Form.Label>
                                <InputGroup>
                                    <Button variant="outline-primary" onClick={addRow} className="w-50">&nbsp;&nbsp;Add row&nbsp;&nbsp;</Button>&nbsp;&nbsp;&nbsp;
                                    <Button variant="outline-danger" onClick={removeRow} className="w-50">&nbsp;&nbsp;Remove row&nbsp;&nbsp;</Button>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3 justify-content-center">
                            {arrayX.map((dataSet, index)=> (
                                <Col key={index}>
                                    <br/>&nbsp;&nbsp;&nbsp;<InputGroup.Text>{"x"+index}&nbsp;&nbsp;&nbsp;&nbsp;</InputGroup.Text>
                                    {dataSet.map((data, idx)=> (
                                        <Form.Control key={idx} value={data} className="text-center" onChange={(e)=> inputX(e, index, idx)}></Form.Control>
                                    ))}
                                </Col>
                            ))}
                            
                            <Col>
                            <br/><h4 className="text-center">y</h4>
                                {arrayY.map((e, index)=> (
                                    <Form.Control key={index} value={e} onChange={(e)=> inputY(e, index)} className="text-center"></Form.Control>
                                ))}
                            
                            </Col><br/>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <InputGroup>
                                    <InputGroup.Text>Target X&nbsp;&nbsp;</InputGroup.Text>
                                    <Form.Control value={targetX} onChange={inputTargetX}></Form.Control>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <br/><Button onClick={calculator}>&nbsp;&nbsp;Calculate&nbsp;&nbsp;</Button>
                    </Form>
                </Card.Body>
                <Card.Footer><br/><h3>Answer : {result}</h3></Card.Footer>
            </Card>
            </center>
        </Container>
    )
}