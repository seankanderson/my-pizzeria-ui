<!-- routify:options name="menu-category-manager" -->
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
    import { getAllCategories } from "../../services/menu-service";
    import CategoryForm from "../../components/menu/category-edit.svelte";

    let loading = false;
    let errorMessage = "";
    let responseMessage = "";  
    let categories = [];
    let selectedCategory;

    //$: {console.log('selectedCategory...', selectedCategory)}

    function resetAnyResultMessages() {
        responseMessage = null;
        errorMessage = null;
    }

    async function getCategories() {
        loading = true;
        resetAnyResultMessages();
        const result = await getAllCategories();
        loading = false;
        console.log("result...", result);
        if (result.error) {
            errorMessage = result.error;
            return;
        }
        categories = result.data;
    }

   
</script>

<Container fluid>
    <Row>
        <Col />
        <Col class="d-flex justify-content-center">
            <Button
                size="lg"
                color="primary"
                class="mt-2"
                on:click={getCategories}>Load Categories</Button
            >
        </Col>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each categories as category}
                            <tr>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td><Button size="sm" on:click={() => selectedCategory = category }>Edit</Button></td>
                            </tr>
                        {/each}
                    </tbody>
                </Table>
            </Col>
            <Col>
                <CategoryForm bind:category={selectedCategory}/>
            </Col>
        </Row>
    </Container>
</Container>
