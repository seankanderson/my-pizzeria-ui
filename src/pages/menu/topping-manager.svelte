<!-- routify:options name="menu-toppings-manager" -->
<script>
    import {
        Button,
        Col,
        Row,
        Container,
        Table,
        Alert,
        Spinner,
    } from "sveltestrap";
    import { getAllToppings } from "../../services/menu-service";
    import ToppingForm from "../../components/menu/topping-edit.svelte";

    let loading = false;
    let errorMessage = "";
    let responseMessage = "";  
    let toppings = [];
    let selectedTopping;

    function resetAnyResultMessages() {
        responseMessage = null;
        errorMessage = null;
    }

    async function getToppings() {
        loading = true;
        resetAnyResultMessages();
        const result = await getAllToppings();
        loading = false;
        console.log("result...", result);
        if (result.error) {
            errorMessage = result.error;
            return;
        }
        toppings = result.data;
    }

   
</script>

<Container fluid>
    <Row>
        <Col class="d-flex justify-content-center">
            <Button
                size="lg"
                color="primary"
                class="mt-2"
                on:click={getToppings}>Load Toppings</Button
            >
        </Col>
        <Col />
        
        <Col />
    </Row>

    {#if loading}
        <div class="text-center m-2">
            <Spinner size="lg" type="border" color="primary" />
        </div>
    {/if}

    {#if errorMessage}
        <Alert color="danger" class="mt-2">
            <p>{errorMessage}</p>
        </Alert>
    {/if}

    <Container>
        <Row>
            <Col>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each toppings as topping}
                            <tr>
                                <td>{topping.name}</td>
                                <td>{topping.shortDescription}</td>
                                <td>{topping.defaultPrice}</td>
                                <td><Button size="sm" on:click={() => selectedTopping = topping }>Edit</Button></td>
                            </tr>
                        {/each}
                    </tbody>
                </Table>
            </Col>
            <Col>
                <ToppingForm bind:topping={selectedTopping}/>
            </Col>
        </Row>
    </Container>
</Container>
