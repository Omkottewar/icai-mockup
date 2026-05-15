/* Auth context + hash-based router. Stored in window for cross-script use. */

const AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(() => {
    try {
      const raw = localStorage.getItem("icai_demo_user");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  });
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    if (user) localStorage.setItem("icai_demo_user", JSON.stringify(user));
    else localStorage.removeItem("icai_demo_user");
  }, [user]);

  const showToast = (text, kind = "success") => {
    setToast({ text, kind });
    setTimeout(() => setToast(null), 2800);
  };

  const login = (creds) => {
    // Demo: any non-empty creds work
    const role = creds.role || "Member";
    const name = creds.name || (role === "Member" ? "CA Anjali Sharma" : role === "Student" ? "Rohan Deshmukh" : "Visitor");
    const u = {
      name,
      email: creds.email || "anjali.sharma@example.com",
      role,
      memberNo: role === "Member" ? "138742" : role === "Student" ? "WRO-0563421" : null,
      cpe: role === "Member" ? 28 : 0,
      udin: role === "Member" ? 14 : 0,
      since: "Apr 2026",
    };
    setUser(u);
    showToast(`Welcome back, ${u.name.split(" ").slice(-1)[0]}!`);
  };

  const signup = (data) => {
    const u = {
      name: data.name,
      email: data.email,
      role: data.role,
      memberNo: data.role === "Member" ? "NEW-" + Math.floor(100000 + Math.random()*900000) : data.role === "Student" ? "WRO-" + Math.floor(1000000 + Math.random()*9000000) : null,
      cpe: 0, udin: 0, since: "May 2026",
    };
    setUser(u);
    showToast("Account created. Welcome to ICAI Nagpur!");
  };

  const logout = () => {
    setUser(null);
    showToast("Signed out", "info");
    window.location.hash = "#/";
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, showToast }}>
      {children}
      {toast && (
        <div className="toast" role="status">
          {toast.kind === "success" ? <IconCheckCircle /> : toast.kind === "error" ? <IconX /> : <IconBell />}
          <span>{toast.text}</span>
        </div>
      )}
    </AuthContext.Provider>
  );
}

const useAuth = () => React.useContext(AuthContext);

/* Tiny hash router: routes are #/path or #/path?key=value */
function useRoute() {
  const [route, setRoute] = React.useState(() => parseHash(window.location.hash));
  React.useEffect(() => {
    const h = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", h);
    return () => window.removeEventListener("hashchange", h);
  }, []);
  return route;
}

function parseHash(hash) {
  const clean = (hash || "").replace(/^#/, "") || "/";
  const [path, qs] = clean.split("?");
  const query = {};
  if (qs) {
    qs.split("&").forEach((p) => {
      const [k, v] = p.split("=");
      if (k) query[decodeURIComponent(k)] = decodeURIComponent(v || "");
    });
  }
  return { path: path.replace(/\/$/, "") || "/", query };
}

function navigate(path) {
  window.location.hash = "#" + path;
}

function Link({ to, children, className, onClick, activeClassName }) {
  const route = useRoute();
  const active = route.path === to || (to !== "/" && route.path.startsWith(to));
  return (
    <a href={"#" + to}
       className={className + (active && activeClassName ? " " + activeClassName : "")}
       onClick={(e) => { onClick && onClick(e); }}>
      {children}
    </a>
  );
}

Object.assign(window, { AuthProvider, AuthContext, useAuth, useRoute, navigate, Link, parseHash });
