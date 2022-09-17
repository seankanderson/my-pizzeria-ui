<!-- routify:options name="login" -->
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
    } from "sveltestrap";

   import axios from 'axios';

    let email;
    let password;
    
    let showErrorMessage = false;
    let errorMessage = '';

    let responseMessage = '';
    let showResponseMessage = false;

    function register(event) {
        showResponseMessage = false;
        showErrorMessage = false;
        axios.post("http://127.0.0.1:4000/accounts/register", {
            email: email,
            password: password,
            confirmPassword: password,
            acceptTerms: true
        }).then(function (response) {
                responseMessage = response.data.message;
                showResponseMessage = true;
            })
            .catch(function (error) {
                errorMessage = error.response.data.message;
                showErrorMessage = true;
            });
    };
   
</script>

<main>
    <Container>
       
                <Form>
                    <FormGroup>
                        <Row>
                            <h2>Customer login</h2>
                        </Row>
                        <Row>
                            <Col>
                                <Label for="emailInput">Email</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input bind:value={email}
                                    type="email"
                                    name="email"
                                    id="emailInput"
                                    
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <Label class="mt-2" for="passwordInput">Password</Label>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Input bind:value={password}
                                    type="password"
                                    name="password"
                                    id="passwordInput"
                                    
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {#if showErrorMessage }
                                    <Alert color=danger  class="mt-2"> 
                                        <p>{errorMessage}</p>
                                    </Alert>
                                {/if}

                                {#if showResponseMessage }
                                    <Alert color=success  class="mt-2">
                                        <p>{responseMessage}</p>
                                    </Alert>
                                {/if}
                                
                            </Col>
                        </Row>
                        
                    </FormGroup>
                </Form>
         
        <Row>
            <Col>
                <Button color="primary" class="mt-2 ms-2 float-end">Login</Button>
                <Button class="mt-2 float-end" on:click={register} >Register</Button>
               
            </Col>
        </Row>
        <Row>
            <Col>
                <Button color=success class="mt-2 float-end">Order as a guest</Button>
            </Col>
        </Row>
    </Container>
</main>
