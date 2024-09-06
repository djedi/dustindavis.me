#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");
const slugify = require("@sindresorhus/slugify");
const tc = require("title-case");
const yaml = require("yaml");

const banner = require("./banner");

let title = readline.question("What is the title of your post?\n");
title = tc.titleCase(title);
let description = readline.question(
	"Give a short description of what the post is about:\n",
);
description = description.charAt(0).toUpperCase() + description.slice(1);
const strCat = readline.question(
	"Enter a comma separated list of categories:\n",
);
const categories = [];
strCat.split(",").forEach((category) => {
	categories.push(category.trim());
});
(async () => {
	const today = new Date().toISOString().split("T")[0];
	const folderName = slugify(`${today} ${title}`);

	fs.mkdirSync(path.join(".", folderName, "images"), { recursive: true });
	console.log(`${folderName} created`);

	const bannerPath = path.join(folderName, "images", "banner.jpg");
	fs.copyFileSync("./banner.jpg", bannerPath);

	const indexPath = path.join(".", folderName, "index.md");
	const frontMatter = {
		slug: slugify(title),
		title,
		date: today,
		author: "Dustin Davis",
		description,
		categories,
		banner: "./images/banner.jpg",
		bannerCredit: "",
	};
	const content = `---\n${yaml.stringify(frontMatter)}\n---\n\nContent\n`;

	fs.writeFileSync(indexPath, content);
})();
