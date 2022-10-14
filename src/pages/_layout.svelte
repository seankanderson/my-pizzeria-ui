<script>
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Spinner,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from "sveltestrap";
  import { goto, url } from "@roxi/routify";
  import { logOut } from "../services/auth-service";
  import { jwt } from "../helpers/stores";
  import { get } from 'svelte/store'
  
  let isOpen = false;
  let loading = false;

  async function logOutUser() {
    loading = true;
    await logOut();
    loading = false;
    
  }

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
  console.log('jwt...', get(jwt))
  // DEBUG
  // $: console.log("Layout $jwt...", $jwt);
</script>

<main>
  <Navbar color="light" light expand="md">
    <NavbarBrand href="/">
      <img src="/mario.64.png" alt="Mario holding a pizza. He is happy." />
      My Pizzeria
    </NavbarBrand>
    <NavbarToggler on:click={() => (isOpen = !isOpen)} />
    <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
      <Nav class="ms-auto" navbar>
        <NavItem>
          {#if loading}
            <Spinner size="sm" type="grow" color="primary" />
          {:else if $jwt}
            <NavLink on:click={logOutUser}>Logout</NavLink>
          {:else}
            <NavLink on:click={$goto("login-or-register")}>
              Login or Register
            </NavLink>
          {/if}
        </NavItem>
        
        <Dropdown>
          <DropdownToggle caret>Admin</DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Food Menu</DropdownItem>
            <DropdownItem on:click={$goto("menu-category-manager")}>Menu Categories</DropdownItem>
            <DropdownItem on:click={$goto("menu-toppings-manager")}>Menu Toppings</DropdownItem>
            <DropdownItem on:click={$goto("menu-toppings-manager")}>Menu Entrees</DropdownItem>
            <DropdownItem divider />
            <DropdownItem header>Accounts</DropdownItem>
            <DropdownItem on:click={$goto("manage-accounts")}>Users</DropdownItem>
          </DropdownMenu>
        </Dropdown>

      </Nav>
    </Collapse>
  </Navbar>
</main>
<slot />
