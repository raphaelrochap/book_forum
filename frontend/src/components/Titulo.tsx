import { Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

export const Titulo = ({ title }: { title: string }) => (
  <Flex
    justifyContent="left"
    alignItems="center"
    bgGradient="linear(to-l, white, white)"
    bgClip="text"
    ml="15px"
  >
    <Link href={"/"}>
      <Heading userSelect={"none"} fontSize="6xl" fontWeight={"black"}>
        {title}
      </Heading>
    </Link>
  </Flex>
);

Titulo.default = {
  title: "with-typescript-chakra-ui",
};
