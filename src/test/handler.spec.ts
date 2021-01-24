import {handler} from "../handler";
import {generateContext, generateGatewayProxyEvent} from "./AwsEventTestUtil";
import {APIGatewayProxyResult} from "aws-lambda";
import {JsonModel} from "../model/JsonModel";

describe("basic tests", () => {
    test("handler function exists", () => {
        expect(typeof handler).toBe("function");
    });
});
test("invalid details", async () => {
    let event = generateGatewayProxyEvent({
        body: "{\"test\":\"body\"}"
    });
    await expect(handler(event, generateContext(), () => void 0)).rejects.toThrow(Error);
})
test("find exact match by zip", async () => {
    let event = generateGatewayProxyEvent({
        body: "{\"zipcode\":\"06824\"}"
    });
    let response: APIGatewayProxyResult = await handler(event, generateContext(), () => void 0) as APIGatewayProxyResult;
    expect(response).toBeTruthy();
    expect(typeof response).toBe('object');
    expect(response.statusCode).toBe(200);
    let expectedResult = JSON.parse(response.body);
    expect(expectedResult.length).toBe(1);
    expect(expectedResult[0].zip).toBe("06824");
});
test("find match by latitude", async () => {
    let event = generateGatewayProxyEvent({
        body: "{\"latitude\":\"40\"}"
    });
    let response: APIGatewayProxyResult = await handler(event, generateContext(), () => void 0) as APIGatewayProxyResult;
    expect(response).toBeTruthy();
    expect(typeof response).toBe('object');
    expect(response.statusCode).toBe(200);
    let expectedResult = JSON.parse(response.body);
    expect(expectedResult.length).toBe(1);
    expect(expectedResult[0].latitude).toBe("41.03");
});
test("find match by longitude", async () => {
    let event = generateGatewayProxyEvent({
        body: "{\"longitude\":\"-53\"}"
    });
    let response: APIGatewayProxyResult = await handler(event, generateContext(), () => void 0) as APIGatewayProxyResult;
    expect(response).toBeTruthy();
    expect(typeof response).toBe('object');
    expect(response.statusCode).toBe(200);
    let expectedResult = JSON.parse(response.body);
    expect(expectedResult.length).toBe(1);
    expect(expectedResult[0].longitude).toBe("-67.01");
});
test("find match by city state and country", async () => {
    let event = generateGatewayProxyEvent({
        body: "{\"city\":\"DARIEN\",\"state\":\"Ct\",\"country\":\"US\"}"
    });
    let response: APIGatewayProxyResult = await handler(event, generateContext(), () => void 0) as APIGatewayProxyResult;
    expect(response).toBeTruthy();
    expect(typeof response).toBe('object');
    expect(response.statusCode).toBe(200);
    let expectedResult = JSON.parse(response.body);
    expect(expectedResult.length).toBe(214);
});
test("find match by latitude and longitude", async () => {
    let event = generateGatewayProxyEvent({
        body: "{\"longitude\":\"-53\",\"latitude\":\"40\"}"
    });
    let response: APIGatewayProxyResult = await handler(event, generateContext(), () => void 0) as APIGatewayProxyResult;
    expect(response).toBeTruthy();
    expect(typeof response).toBe('object');
    expect(response.statusCode).toBe(200);
    let expectedResult = JSON.parse(response.body);
    expect(expectedResult.length).toBe(2);
});
test("filter by state, city and country found 0 result", async () => {
    let event = generateGatewayProxyEvent({
        body: "{\"city\":\"DARIEN\",\"state\":\"new_state\",\"country\":\"US\",\"longitude\":\"-53\",\"latitude\":\"40\"}"
    });
    let response: APIGatewayProxyResult = await handler(event, generateContext(), () => void 0) as APIGatewayProxyResult;
    expect(response).toBeTruthy();
    expect(typeof response).toBe('object');
    expect(response.statusCode).toBe(200);
    let expectedResult = JSON.parse(response.body);
    expect(expectedResult.length).toBe(0);
});


function getDetailForZip() {
    return new JsonModel("06824", "STANDARD", "Fairfield", null, null, "CT", "Fairfield County", "America/New_York", "203", "41.13", "-73.28", "US", "26855");
}