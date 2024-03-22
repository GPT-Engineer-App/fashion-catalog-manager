import React, { useState } from "react";
import { Box, Heading, Text, Image, Grid, GridItem, Button, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaShoppingCart } from "react-icons/fa";

const Index = () => {
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: "Summer 2023",
      description: "Vibrant and breezy styles for the summer season.",
      image: "https://images.unsplash.com/photo-1504198458649-3128b932f49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBmYXNoaW9uJTIwY29sbGVjdGlvbnxlbnwwfHx8fDE3MTExMjA2Mzd8MA&ixlib=rb-4.0.3&q=80&w=1080",
    },
    {
      id: 2,
      name: "Fall 2023",
      description: "Cozy and trendy outfits for the autumn months.",
      image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxmYWxsJTIwZmFzaGlvbiUyMGNvbGxlY3Rpb258ZW58MHx8fHwxNzExMTIwNjM4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    },
  ]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddToCart = (collection) => {
    setCartItems([...cartItems, collection]);
  };

  const handleEditCollection = (collection) => {
    setSelectedCollection(collection);
    onOpen();
  };

  const handleDeleteCollection = (id) => {
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  const handleSaveCollection = () => {
    const updatedCollections = collections.map((collection) => (collection.id === selectedCollection.id ? selectedCollection : collection));
    setCollections(updatedCollections);
    setSelectedCollection(null);
    onClose();
  };

  return (
    <Box p={8}>
      <Heading as="h1" mb={8}>
        Fashion Collection Management
      </Heading>

      <Grid templateColumns="repeat(3, 1fr)" gap={8}>
        {collections.map((collection) => (
          <GridItem key={collection.id}>
            <Box borderWidth={1} borderRadius="lg" overflow="hidden">
              <Image src={collection.image} alt={collection.name} />
              <Box p={4}>
                <Heading as="h2" size="md" mb={2}>
                  {collection.name}
                </Heading>
                <Text mb={4}>{collection.description}</Text>
                <Button leftIcon={<FaShoppingCart />} colorScheme="blue" size="sm" mr={2} onClick={() => handleAddToCart(collection)}>
                  Add to Cart
                </Button>
                <Button leftIcon={<FaEdit />} colorScheme="teal" size="sm" mr={2} onClick={() => handleEditCollection(collection)}>
                  Edit
                </Button>
                <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteCollection(collection.id)}>
                  Delete
                </Button>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>

      <Box mt={8}>
        <Heading as="h2" mb={4}>
          Shopping Cart
        </Heading>
        {cartItems.length === 0 ? (
          <Text>Your cart is empty.</Text>
        ) : (
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>{item.name}</li>
            ))}
          </ul>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Collection</ModalHeader>
          <ModalBody>
            {selectedCollection && (
              <>
                <Input
                  value={selectedCollection.name}
                  onChange={(e) =>
                    setSelectedCollection({
                      ...selectedCollection,
                      name: e.target.value,
                    })
                  }
                  placeholder="Collection Name"
                  mb={4}
                />
                <Input
                  value={selectedCollection.description}
                  onChange={(e) =>
                    setSelectedCollection({
                      ...selectedCollection,
                      description: e.target.value,
                    })
                  }
                  placeholder="Collection Description"
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveCollection}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Index;
