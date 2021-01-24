import {APIGatewayProxyEvent, Context} from "aws-lambda";

interface generateProps {
    body?: { [key: string]: any } | string,
    headers?: { [key: string]: string }
}

export const generateGatewayProxyEvent = ({body = {}, headers = {}}: generateProps = {}): APIGatewayProxyEvent => {
    return {
        body: typeof body === "object" ? JSON.stringify(body) : body,
        headers: headers,
        httpMethod: "",
        isBase64Encoded: false,
        multiValueHeaders: {},
        multiValueQueryStringParameters: {},
        path: "",
        pathParameters: {},
        queryStringParameters: {},
        requestContext: {
            accountId: "",
            apiId: "",
            authorizer: undefined,
            httpMethod: "",
            identity: {
                accessKey: "",
                accountId: "",
                apiKey: "",
                apiKeyId: "",
                caller: "",
                cognitoAuthenticationProvider: "",
                cognitoAuthenticationType: "",
                cognitoIdentityId: "",
                cognitoIdentityPoolId: "",
                principalOrgId: "",
                sourceIp: "",
                user: "",
                userAgent: "",
                userArn: ""
            },
            path: "",
            protocol: "",
            requestId: "",
            requestTimeEpoch: new Date().getTime(),
            resourceId: "",
            resourcePath: "",
            stage: ""
        },
        resource: "",
        stageVariables: {}
    };
};
export const generateContext = (): Context => {
    return {
        awsRequestId: "",
        callbackWaitsForEmptyEventLoop: true,
        functionName: "",
        functionVersion: "",
        done: () => { },
        fail: () => { },
        getRemainingTimeInMillis: () => { return 100 },
        invokedFunctionArn: "",
        logGroupName: "",
        logStreamName: "",
        memoryLimitInMB: "",
        succeed: () => { }
    };
};