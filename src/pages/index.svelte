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
  import { getAllCategories } from "../../services/menu-service";
  import ToppingForm from "../../components/menu/topping-edit.svelte";
  import { afterPageLoad, url } from "@roxi/routify";

  let loading = false;
  let errorMessage = "";
  let responseMessage = "";
  let allCategories = [];
  let selectedTopping;

  function resetAnyResultMessages() {
    responseMessage = null;
    errorMessage = null;
  }

  $afterPageLoad(async (page) => {
    loading = true;
    const response = await getAllCategories();
    loading = false;
    allCategories = response.data;
    selectedId = allCategories[0]._id;
    //console.log('allCategories..', allCategories)
  });
</script>

<Container fluid>
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
        {#each allCategories as category}
          
            <li>{category.name}</li>
           
            
             <a href={$url('')}>Order</a>
            
          
        {/each}
      </Col>
      <Col>
        <ToppingForm bind:topping={selectedTopping} />
      </Col>
    </Row>
  </Container>
</Container>
