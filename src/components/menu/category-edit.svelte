<script>
    import { Form, FormGroup, Row, Col, Input, Label, Button, Alert, Spinner, Container } from "sveltestrap";
    import { createOrUpdateCategory} from "../../services/menu-service";
    let loading = false;
    
    export let category = {_id: '', name: '', description: ''};
   
    let errorMessage = "";
    let responseMessage = "";
    
    async function saveCategory() {
        console.log('categroy...', category)
        loading = true;
        //category = {_id: categoryId, name: categoryName, description: categoryDescription};
        const response = await createOrUpdateCategory(category);
        console.log('saveCategory response...', response)
        category = response.data;
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
                        bind:value={category.name}
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
                        bind:value={category.description}
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
                        on:click={saveCategory}>Save</Button
                    >
                </Col>
            </Row>
        </Form>
    </FormGroup>
    
</Container>
