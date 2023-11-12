import React from 'react';
import { Container, Row, Col, Button, Form, Card, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import { GaussJordanReplace } from "../Regression/GJordan";

function PolyRegression() {
    const [arrayPoints, setArrayPoints] = useState([{x: 0, y: 0}]);
    const [targetX, setTargetX] = useState(0);
    const [orderM, setOrderM] = useState(2);
    const [size, setSize] = useState(3);

    const [result, setResult] = useState(0);

    // input handler
    const inputSize = (e)=> {
        setSize(e.target.value);
    }
    const setPointSize = () => {
        const newArr = [...arrayPoints];
        let sizeDiff = size-newArr.length;
        for (let i = 0; i < Math.abs(sizeDiff); i++) {
            if (sizeDiff > 0) {
                newArr.push({
                    x: 0,
                    y: 0,
                })
            }
            else {
                newArr.pop();
            }
        }
        setArrayPoints(newArr);
    }
    const inputX = (e, index) => {
        const newArr = [...arrayPoints];
        newArr[index].x = e.target.value;
        setArrayPoints(newArr);
    };
    const inputY = (e, index) => {
        const newArr = [...arrayPoints];
        newArr[index].y = e.target.value;
        setArrayPoints(newArr);
    };
    const inputTargetX = (e)=> {
        setTargetX(e.target.value);
    }
    const inputOrderM = (e)=> {
        setOrderM(e.target.value);
    }


    const calculator = () => {
        const x = arrayPoints.map((e)=> (parseFloat(e.x)));
        const y = arrayPoints.map((e)=> (parseFloat(e.y)));
        const xTarget = parseFloat(targetX);
        const m = parseInt(orderM);
        let answer = [];
        const arr = Array.from({ length: m + 1 }, () => Array(m + 1).fill(0));

        for (let i = 0; i < m + 1; i++) {
            for (let j = 0; j < m + 1; j++) {
                if (i === 0 && j === 0) {
                    arr[i][j] = parseInt(size);
                } else {
                    arr[i][j] = sum(x, i + j);
                }
            }
        }

        for (let i = 0; i < m + 1; i++) {
            if (i === 0) {
                answer[i] = sum(y, 1);
            } else {
                answer[i] = mulSum(x, y, i);
            }
        }

        function sum(matrix, power) {
            let sum = 0;
            for (let i = 0; i < matrix.length; i++) {
                sum += Math.pow(matrix[i], power);
            }
            return sum;
        }

        function mulSum(matrixA, matrixB, power) {
            let result = 0;
            for (let i = 0; i < matrixA.length; i++) {
                result += Math.pow(matrixA[i], power)*matrixB[i];
            }
            return result;
        }

        
        function f(x) {
            let A =  GaussJordanReplace(arr, answer);
            let result = A[0];
            
            for (let i = 1; i < A.length; i++) {
                result += A[i]*Math.pow(x, i);
            }
            console.log(A);
            return result;
        }
        setResult(f(xTarget));
    }
        return(
            <Container>
                <center>
            <Card>
                <Card.Header><br/><h1>Polynomial Regression</h1></Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Col xs={2}>
                                <Form.Label>Number of points</Form.Label>
                                <InputGroup>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Form.Control type="number" value={size} onChange={inputSize}></Form.Control>
                                &nbsp;&nbsp;&nbsp;<Button onClick={setPointSize}>&nbsp;&nbsp;Set&nbsp;&nbsp;</Button></p>
                                </InputGroup>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            {arrayPoints.map((e, index)=> (
                                <Form.Group as={Row} key={index} className="mb-3">
                                <Col>
                                <InputGroup>
                                &nbsp;&nbsp;&nbsp;&nbsp;<InputGroup.Text>{"x"+index}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputGroup.Text>
                                    <Form.Control onChange={(e)=> inputX(e, index)}></Form.Control>
                                </InputGroup>
                                </Col><br/>
                                <Col>
                                <InputGroup>
                                &nbsp;&nbsp;&nbsp;&nbsp;<InputGroup.Text>{"y"+index}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</InputGroup.Text>
                                    <Form.Control onChange={(e)=> inputY(e, index)}></Form.Control>
                                </InputGroup>
                                </Col><br/>
                            </Form.Group>
                            ))}
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col>
                                <InputGroup>
                                    <InputGroup.Text>Target X</InputGroup.Text>&nbsp;&nbsp;&nbsp;
                                    <Form.Control value={targetX} onChange={(e)=> inputTargetX(e)}></Form.Control>
                                </InputGroup>
                            </Col><br/>
                            <Col>
                                <InputGroup>
                                    <InputGroup.Text>Order (m)</InputGroup.Text>&nbsp;&nbsp;
                                    <Form.Control value={orderM} onChange={(e)=> inputOrderM(e)}></Form.Control>
                                </InputGroup>
                            </Col>
                        </Form.Group><br/>
                        <Button onClick={calculator}>&nbsp;&nbsp;Calculate&nbsp;&nbsp;</Button>
                    </Form>
                </Card.Body><br/>
                <Card.Footer><h3>Answer : {result}</h3></Card.Footer>
            </Card>
            </center>
        </Container>
        )
}

export default PolyRegression;