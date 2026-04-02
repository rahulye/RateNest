/// <reference types="@clerk/express/env" />

import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}