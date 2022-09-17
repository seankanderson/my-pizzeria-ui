
<script>
    //import LoginRegister from "./lib/LoginRegister.svelte";
    
    import { url } from '@roxi/routify'
    import {
      Button,
      Col,
      Row,
      Container,
      Collapse,
      Navbar,
      NavbarToggler,
      NavbarBrand,
      Nav,
      NavItem,
      NavLink,
      Dropdown,
      DropdownToggle,
      DropdownMenu,
      DropdownItem,
    } from "sveltestrap";
  
    let isOpen = false;
  
    function handleUpdate(event) {
      isOpen = event.detail.isOpen;
    }
  </script>

<main>

    <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src="/mario.64.png" alt="Mario holding a pizza. He is happy." />My Pizzeria</NavbarBrand>
        <NavbarToggler on:click={() => (isOpen = !isOpen)} />
        <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
          <Nav class="ms-auto" navbar>
            <NavItem>
              <NavLink href="{$url('login')}">Login or Register</NavLink>
            </NavItem>            
          </Nav>
        </Collapse>
      </Navbar>

</main>
<slot />
