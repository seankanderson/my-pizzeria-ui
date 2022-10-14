<script>
  import {
    Form,
    FormGroup,
    Row,
    Col,
    Input,
    Label,
    Button,
    Alert,
    Spinner,
    Container,
  } from "sveltestrap";

  import {
    createOrUpdateTopping,
    getAllCategories,
  } from "../../services/menu-service";

  import { afterPageLoad } from "@roxi/routify";
  import { getResponseMessages } from "../../services/api-service";

  let loading = false;
  let allCategories = [];
  export let currentCategories = [];

  $afterPageLoad(async (page) => {
    loading = true;
    const response = await getAllCategories();
    loading = false;
    allCategories = response.data;
    selectedId = allCategories[0]._id;
    //console.log('allCategories..', allCategories)
  });

  function addCategory() {
    //console.log('selectedId....', selectedId)
    currentCategories.push(selectedCategory.name);
    currentCategories = currentCategories;
  }

  function removeCategory(value) {
    currentCategories = currentCategories.filter(x => x !== value)
  }

  let selectedId;
  let selectedCategory; // set default category
  $: {
    selectedCategory = allCategories.find((o) => o._id === selectedId);
    console.log("selectedCategory...", selectedCategory);
  }
</script>

<Container>
  <Row>
    <Col>
      <Label class="float-end" for="categoryDropdown">Categories</Label>
    </Col>

    <Col>
      <Input
        type="select"
        name="select"
        id="exampleSelect"
        bind:value={selectedId}
      >
        {#each allCategories as category}
          <option value={category._id}>{category.name}</option>
        {/each}
      </Input>
      <button
        disabled={loading}
        class="mt-2 float-end"
        on:click|preventDefault={addCategory}
      >
        Add
      </button>
    </Col>
  </Row>

  {#each currentCategories as category}
    <Row>
      <Col>{category}</Col>
      <Col>
        <button
          disabled={loading}
          class="mt-2 float-end"
          on:click|preventDefault={() => removeCategory(category)}
        >
          Delete
        </button>
      </Col>
    </Row>
  {/each}
</Container>
