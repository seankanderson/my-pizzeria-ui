<script>
    import { Form, FormGroup, Row, Col, Input, Label, Button, Alert, Spinner, Container } from "sveltestrap";
    import { createOrUpdateTopping} from "../../services/menu-service";
    let loading = false;
    
    export let topping = {_id: '', name: '', description: ''};
   
    let errorMessage = "";
    let responseMessage = "";
    
    async function saveTopping() {
        console.log('topping...', topping)
        loading = true;
        const response = await createOrUpdateTopping(topping);
        console.log('saveTopping response...', response)
        topping = response.data;
        loading = false;
    }

</script>
<Container fluid>
    <FormGroup>
        <Form>
            <Row>
                <Col>
                    <Label for="nameInput">Name</Label>
                </Col>
    
                <Col>
                    <Input
                        bind:value={topping.name}
                        type="name"
                        name="name"
                        id="nameInput"
                    />
                </Col>
            </Row>
    
            <Row>
                <Col>
                    <Label for="descriptionInput">Description</Label>
                </Col>
    
                <Col>
                    <Input
                        bind:value={topping.description}
                        type="description"
                        name="description"
                        id="descriptionInput"
                    />
                </Col>
            </Row>
    
            {#if errorMessage || responseMessage || loading}
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
                                size="sm"
                                type="border"
                                color="primary"
                            />
                        </div>
                    {/if}
                </Col>
            </Row>
            {/if}
            <Row>
                <Col />
    
                <Col />
    
                <Col>
                    <Button
                        disabled={loading}
                        class="mt-2 float-end"
                        on:click={saveTopping}>Save</Button
                    >
                </Col>
            </Row>
        </Form>
    </FormGroup>
    
</Container>
