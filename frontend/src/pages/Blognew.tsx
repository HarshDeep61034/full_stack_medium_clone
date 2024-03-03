import React, { useState } from "react";
import { LogedNavbar } from "../components/LogedNavbar";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebase";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  MDXEditor,
  toolbarPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  KitchenSinkToolbar,
  listsPlugin,
  quotePlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  diffSourcePlugin,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

export function Blognew() {
  const [loading, setLoading] = useState(false);

  async function handleUpload(file) {
    if (!file) return; // Add a check to ensure there's a file
    const path = `/images/${file.name}`;
    const storageRef = ref(storage, path);
    try {
      setLoading(true);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      console.log(downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  }

  const allPlugins = (diffMarkdown: string) => [
    toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    // eslint-disable-next-line @typescript-eslint/require-await
    imagePlugin({ imageUploadHandler: handleUpload }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
    codeMirrorPlugin({
      codeBlockLanguages: {
        js: "JavaScript",
        css: "CSS",
        txt: "text",
        tsx: "TypeScript",
      },
    }),
    directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
    diffSourcePlugin({ viewMode: "rich-text", diffMarkdown }),
    markdownShortcutPlugin(),
  ];

  const blogTemplate = `
# Title

    
## Introduction
    
 Briefly introduce the topic of your blog post 
    
## Table of Contents
    
   Include a table of contents if your blog post is long and covers multiple sections 
    
 - [Section 1: Overview](#section-1-overview)
 - [Section 2: Key Concepts](#section-2-key-concepts)
 - [Section 3: Examples](#section-3-examples)
 - [Conclusion](#conclusion)
    
 ## Section 1: Overview
    
     Provide an overview of the main points you'll cover in this section 
    
 ## Section 2: Key Concepts
    
     Explain key concepts related to your topic 
    
 ## Section 3: Examples
    
     Provide examples or case studies to illustrate your points
    
 ## Conclusion
    
     Summarize the key takeaways from your blog post 
    
 ## Call to Action
    
     Encourage readers to share their thoughts, ask questions, or take a specific action 
    
 ## Additional Resources
    
    Include links to related articles, books, or resources for further reading 
    
  ## Acknowledgments
    
     If you collaborated with others or used external resources, acknowledge them here 
    
    ---
    
    *Note: This is a template; feel free to modify and customize it based on your specific needs and the nature of your blog post.*
    `;

  const [value, setValue] = useState(blogTemplate);
  const titleMatch = value.match(/^# (.+)$/m);
  const navigate = useNavigate();
  const title = titleMatch ? titleMatch[1] : "Untitled Blog";

  async function handlePublish() {
    const api_url = import.meta.env.VITE_REACT_APP_API_URL;

    const token = Cookies.get("token");

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    const data = {
      title,
      content: value,
      published: true,
    };
    axios
      .post(`${api_url}/api/v1/blog/`, data, {
        headers: headers,
      })
      .then((response) => {
        alert(response.data.message);
        navigate(`/blog/${response.data.id}`);
      })
      .catch((error) => {
        console.log("Error : " + error);
      });
  }
  return (
    <div>
      <LogedNavbar route="/blog/new" handlePublish={handlePublish} />
      <MDXEditor
        markdown={value}
        onChange={setValue}
        className="full-demo-mdxeditor w-[80vw] mx-auto relative top-24"
        contentEditableClassName="prose max-w-full font-sans"
        plugins={allPlugins("# Hello World")}
      />
    </div>
  );
}
