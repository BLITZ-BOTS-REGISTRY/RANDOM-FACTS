import { SlashCommandBuilder, EmbedBuilder } from "npm:discord.js";
import axios from "npm:axios"; 
export default {
  data: new SlashCommandBuilder()
    .setName("randomfact")
    .setDescription("Get a random fact."),
  action: async (client, interaction, config) => {
    try {
      interaction.deferReply();
      const response = await axios.get("https://uselessfacts.jsph.pl/random.json?language=en");
      const fact = response.data.text;
      const embed = new EmbedBuilder()
      .setColor("Random")
      .setDescription(`🤔 Did you know that: ${fact}`)
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      await interaction.editReply({ content: "Sorry, I couldn't fetch a random fact right now.", ephemeral: true });
    }
  },
};
