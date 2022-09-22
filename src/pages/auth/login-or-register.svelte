<!-- routify:options name="login-or-register" -->
<script>
    import {
        Button,
        Label,
        Input,
        Col,
        Row,
        Container,
        Form,
        FormGroup,
        Alert,
        Spinner,
    } from "sveltestrap";

    import { register, login } from "../../services/auth-service";
    import { goto } from "@roxi/routify";
    import _ from "lodash";
    import { getResponseMessages } from "../../services/api-service";
    import { jwt } from "../../helpers/stores"

    let loading = false;

    let email = 'admin@email.com';
    let password = 'shift2enter';

    let errorMessage = "";
    let responseMessage = "";
    

    async function loginUser() {
        resetAnyResultMessages();

        loading = true;
        const response = await login(email, password);
        loading = false;
        
        //jwt.update(token => response.data.jwtToken);
        $jwt = response.data.jwtToken

        console.log('Stored Login token...', $jwt);
        ({responseMessage, errorMessage} = getResponseMessages(response))
    }

    async function registerUser(event) {
        resetAnyResultMessages();

        loading = true;
        const response = await register(email, password);
        loading = false;

        ({responseMessage, errorMessage} = getResponseMessages(response));
    }

    function resetAnyResultMessages() {
        responseMessage = null;
        errorMessage = null;
    }

</script>

<main>
    <Container fluid>
        <Row>
            <Col />
            <Col>
                <Container>
                    <Form>
                        <FormGroup>
                            <Row>
                                <h2>Online account</h2>
                            </Row>
                            <Row>
                                <Col>
                                    <Label for="emailInput">Email</Label>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input
                                        bind:value={email}
                                        type="email"
                                        name="email"
                                        id="emailInput"
                                        
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <Label class="mt-2" for="passwordInput"
                                        >Password</Label
                                    >
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input
                                        bind:value={password}
                                        type="password"
                                        name="password"
                                        id="passwordInput"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {#if errorMessage}
                                        <Alert color="danger" class="mt-2">
                                            <p>{errorMessage}</p>
                                        </Alert>
                                    {/if}

                                    {#if responseMessage}
                                        <Alert color="success" class="mt-2">
                                            <p>{responseMessage}</p>
                                        </Alert>
                                    {/if}

                                    {#if loading}
                                        <div class="text-center m-2">
                                            <Spinner
                                                size="lg"
                                                type="border"
                                                color="primary"
                                            />
                                        </div>
                                    {/if}
                                </Col>
                            </Row>
                        </FormGroup>
                    </Form>

                    <Row>
                        <Col>
                            <Button
                                disabled={loading}
                                color="primary"
                                class="mt-2 ms-2 float-end"
                                on:click={loginUser}>Login</Button
                            >
                            <Button
                                disabled={loading}
                                class="mt-2 float-end"
                                on:click={registerUser}>Register</Button
                            >
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                disabled={loading}
                                color="success"
                                class="mt-2 float-end"
                                on:click={$goto("menu")}
                                >Order as a guest</Button
                            >
                        </Col>
                    </Row>
                </Container>
            </Col>
            <Col />
        </Row>
    </Container>
</main>
