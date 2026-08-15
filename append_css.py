import os

css_path = r"e:\Freelance\frontEnd\الخليجية\style.css"
css_to_add = """
/* ==========================================================================
   Site Logo Styles
   ========================================================================== */
.site-logo {
  height: 65px;
  width: auto;
  border-radius: 8px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

header.scrolled .site-logo {
  height: 55px;
}

@media (max-width: 768px) {
  .site-logo {
    height: 50px;
  }
  header.scrolled .site-logo {
    height: 45px;
  }
}

.site-logo-footer {
  height: 80px;
  width: auto;
  border-radius: 8px;
  object-fit: contain;
  margin-bottom: 1rem;
}
"""

with open(css_path, 'a', encoding='utf-8') as f:
    f.write(css_to_add)

print("Appended CSS successfully.")
