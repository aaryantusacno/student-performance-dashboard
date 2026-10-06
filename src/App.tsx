import React, { useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

type Page = "Dashboard" | "Predict Performance" | "Students" | "Analytics" | "Model Insights" | "About Project";
type IconName = "grid" | "spark" | "users" | "chart" | "brain" | "info" | "calendar" | "cap" | "arrow" | "menu" | "close" | "check" | "clock" | "database";

const paths: Record<IconName, React.ReactNode> = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  spark: <><path d="M12 3 9.8 8.1 5 10.2l4.8 2.1L12 18l2.2-5.7 4.8-2.1-4.8-2.1L12 3Z"/><path d="m19 16-.8 2-2.2.9 2.2.9.8 2.2.8-2.2 2.2-.9-2.2-.9-.8-2Z"/></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20V7"/></>,
  brain: <><path d="M9.5 4.5A3 3 0 0 0 4 6v1.5A3.5 3.5 0 0 0 3.5 14 3.5 3.5 0 0 0 9 18.5V21M14.5 4.5A3 3 0 0 1 20 6v1.5a3.5 3.5 0 0 1 .5 6.5 3.5 3.5 0 0 1-5.5 4.5V21M9 8h2M13 12h2M9 16h2M12 3v18"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-13 5 2 2 5-5"/></>,
  cap: <><path d="m2 10 10-5 10 5-10 5L2 10Z"/><path d="M6 12.5V17c3 2.5 9 2.5 12 0v-4.5M22 10v6"/></>,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  check: <><path d="m5 12 4 4L19 6"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></>,
};

function Icon({ name, size = "md" }: { name: IconName; size?: "sm" | "md" | "lg" }) {
  return <svg className={`icon icon-${size}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

function Button({ children, variant = "primary", onClick, disabled = false, type = "button" }: { children: React.ReactNode; variant?: "primary" | "secondary" | "ghost"; onClick?: () => void; disabled?: boolean; type?: "button" | "submit" }) {
  return React.createElement("button", { className: `button button-${variant}`, onClick, disabled, type }, children);
}

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "info" | "success" | "warning" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><div className="heading-md">{title}</div>{subtitle && <div className="supporting">{subtitle}</div>}</div>{action}</div>;
}

function PageHeader({ title, subtitle, badge }: { title: string; subtitle: string; badge?: string }) {
  return <header className="page-header"><div><div className="eyebrow">EDUPREDICT / {title.toUpperCase()}</div><div className="heading-xl">{title}</div><div className="body-muted">{subtitle}</div></div>{badge && <Badge tone="info">{badge}</Badge>}</header>;
}

const navItems: { name: Page; icon: IconName }[] = [
  { name: "Dashboard", icon: "grid" }, { name: "Predict Performance", icon: "spark" },
  { name: "Students", icon: "users" }, { name: "Analytics", icon: "chart" },
  { name: "Model Insights", icon: "brain" }, { name: "About Project", icon: "info" },
];

function Sidebar({ page, setPage, open, close }: { page: Page; setPage: (page: Page) => void; open: boolean; close: () => void }) {
  return <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
    <div className="brand-row"><div className="brand-mark"><Icon name="cap" /></div><div><div className="brand-name">EduPredict</div><div className="brand-subtitle">Student Analytics</div></div><div className="sidebar-close"><Button variant="ghost" onClick={close}><Icon name="close" /></Button></div></div>
    <nav className="nav-list" aria-label="Primary navigation">
      <div className="nav-label">WORKSPACE</div>
      {navItems.map((item) => React.createElement("button", {
        key: item.name, className: `nav-item ${page === item.name ? "nav-item-active" : ""}`,
        onClick: () => { setPage(item.name); close(); }, "aria-current": page === item.name ? "page" : undefined,
      }, <><Icon name={item.icon}/><span>{item.name}</span>{page === item.name && <span className="nav-dot"/>}</>))}
    </nav>
    <div className="sidebar-footer"><Badge tone="neutral">v1.0</Badge><div className="footer-title">Academic Mini Project</div><div className="footer-copy">Mumbai University · NEP 2020</div></div>
  </aside>;
}

function MetricCard({ icon, label, value, note, tone = "blue" }: { icon: IconName; label: string; value: string; note: string; tone?: "blue" | "teal" | "amber" | "green" }) {
  return <Card className="metric-card"><div className={`metric-icon metric-${tone}`}><Icon name={icon}/></div><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-note">{note}</div></Card>;
}

function EmptyChart({ type = "bars" }: { type?: "bars" | "scatter" | "heat" }) {
  if (type === "scatter") return <div className="chart-visual scatter"><span/><span/><span/><span/><span/><span/><div className="chart-axis axis-y">Final marks</div><div className="chart-axis axis-x">Input feature</div></div>;
  if (type === "heat") return <div className="heatmap">{Array.from({ length: 25 }, (_, i) => <span key={i} className={`heat-${(i * 3) % 5}`}/>)}</div>;
  return <div className="chart-visual bars"><span/><span/><span/><span/><span/><span/><span/><div className="chart-axis axis-y">Students</div><div className="chart-axis axis-x">Marks range</div></div>;
}

function Dashboard({ navigate }: { navigate: (page: Page) => void }) {
  const [summary, setSummary] = useState<{total_students: number, average_marks: number, average_attendance: number} | null>(null);
  const [modelStatus, setModelStatus] = useState<"checking" | "ok" | "error">("checking");
  const [analytics, setAnalytics] = useState<any>(null);

  React.useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then(res => res.json())
      .then(data => setModelStatus(data.model_loaded ? "ok" : "error"))
      .catch(() => setModelStatus("error"));

    fetch(`${API_URL}/api/dataset-summary`)
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(console.error);

    fetch(`${API_URL}/api/analytics`)
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(console.error);
  }, []);

  return <><PageHeader title="Dashboard" subtitle="Understand student performance through data-driven insights." badge={summary ? "Dataset connected" : "Dataset not connected"}/>
    <div className="metrics-grid">
      <MetricCard icon="users" label="Total Students" value={summary ? summary.total_students.toString() : "Awaiting data"} note={summary ? "Total records" : "Connect a dataset to calculate"} />
      <MetricCard icon="cap" label="Average Marks" value={summary ? `${summary.average_marks} / 100` : "Not calculated"} note="Based on final marks" tone="teal" />
      <MetricCard icon="calendar" label="Average Attendance" value={summary ? `${summary.average_attendance}%` : "Not calculated"} note="Based on attendance data" tone="amber" />
      <MetricCard icon="brain" label="Model Status" value={modelStatus === "checking" ? "Checking..." : modelStatus === "ok" ? "Verified & Ready" : "Not available"} note={modelStatus === "ok" ? "Model is loaded" : "No trained model detected"} tone={modelStatus === "ok" ? "green" : "amber"} />
    </div>
    <div className="dashboard-grid">
      <Card className="chart-card large-chart"><SectionTitle title="Student Performance Overview" subtitle={summary ? "Performance dashboard is ready." : "Distribution of final marks will appear after a dataset is connected."} action={<Badge>{summary ? "Live data" : "Empty state"}</Badge>}/>
        {!analytics ? <EmptyChart/> : <div className="chart-visual bars">{analytics.distribution.counts.map((c: number, i: number) => <span key={i} style={{height: `${(c/Math.max(...analytics.distribution.counts))*100}%`}} title={analytics.distribution.labels[i]}/>)}<div className="chart-axis axis-y">Students</div><div className="chart-axis axis-x">Marks range</div></div>}
        {!summary && <div className="chart-empty-note"><Icon name="database" size="sm"/><span>Connect the project dataset to render this chart using actual values.</span></div>}
      </Card>
      <Card className="quick-card"><SectionTitle title="Start a prediction" subtitle="The primary project workflow"/><div className="quick-graphic"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="quick-icon"><Icon name="spark" size="lg"/></div></div><div className="quick-copy">Enter academic inputs and generate an estimate when a trained model is available.</div><Button onClick={() => navigate("Predict Performance")}>Open prediction form <Icon name="arrow" size="sm"/></Button></Card>
    </div>
    <div className="insight-grid">
      <Card className="insight-card"><div className="insight-top"><div className="metric-icon metric-blue"><Icon name="calendar"/></div><Badge tone="neutral">Analytics</Badge></div><div className="heading-sm">Attendance & Performance</div><div className="supporting">Explore the relationship between attendance and academic marks.</div><Button variant="ghost" onClick={() => navigate("Analytics")}>View analysis <Icon name="arrow" size="sm"/></Button></Card>
      <Card className="insight-card"><div className="insight-top"><div className="metric-icon metric-teal"><Icon name="clock"/></div><Badge tone="neutral">Analytics</Badge></div><div className="heading-sm">Study Hours & Performance</div><div className="supporting">Explore the relationship between study time and academic marks.</div><Button variant="ghost" onClick={() => navigate("Analytics")}>View analysis <Icon name="arrow" size="sm"/></Button></Card>
    </div>
    <Card><SectionTitle title="Recent Predictions" subtitle="Prediction history is not enabled in this version." action={<Badge tone="warning">Optional module</Badge>}/><div className="empty-row"><div className="empty-icon"><Icon name="clock"/></div><div><div className="heading-sm">No predictions recorded</div><div className="supporting">Generated predictions will appear here only when history storage is implemented.</div></div><Button variant="secondary" onClick={() => navigate("Predict Performance")}>Create prediction</Button></div></Card>
  </>;
}

const fieldData = [
  { label: "Attendance Percentage", placeholder: "Enter attendance percentage", helper: "Enter a value between 0 and 100.", key: "attendance", min: 0, max: 100 },
  { label: "Study Hours per Day", placeholder: "Enter study hours", helper: "Enter a value between 0 and 24.", key: "hours", min: 0, max: 24 },
  { label: "Previous Exam Marks", placeholder: "Enter previous marks", helper: "Enter a value between 0 and 100.", key: "previous", min: 0, max: 100 },
  { label: "Assignment Marks", placeholder: "Enter assignment marks", helper: "Enter a value between 0 and 100.", key: "assignment", min: 0, max: 100 },
  { label: "Internal Assessment Marks", placeholder: "Enter internal marks", helper: "Enter a value between 0 and 100.", key: "internal", min: 0, max: 100 },
];

function PredictPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [state, setState] = useState<"empty" | "loading" | "success" | "error" | "unavailable">("empty");
  const [prediction, setPrediction] = useState<{lr: number, dt: number} | null>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  React.useEffect(() => {
    fetch(`${API_URL}/api/analytics`)
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(console.error);
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (fieldData.some((item) => !values[item.key])) {
      setState("error");
      return;
    }
    
    setState("loading");
    try {
      const res = await fetch(`${API_URL}/api/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attendance: Number(values.attendance),
          study_hours: Number(values.hours),
          previous_marks: Number(values.previous),
          assignment_marks: Number(values.assignment),
          internal_marks: Number(values.internal)
        })
      });
      
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setPrediction({ lr: data.predicted_marks, dt: data.predicted_marks_dt });
      setState("success");
    } catch (e) {
      setState("unavailable");
    }
  };

  return <><PageHeader title="Predict Student Performance" subtitle="Enter academic details to estimate the student's final marks." badge="Machine Learning Prediction"/>
    <div className="predict-grid">
      <Card><SectionTitle title="Student Academic Information" subtitle="Use the exact feature definitions and scales from the trained model."/>
        <form className="form-grid" onSubmit={submit}>
          {fieldData.map(({ label, placeholder, helper, key, min, max }) => <label className="field" key={key}><span className="field-label">{label}</span>{React.createElement("input", { type: "number", placeholder, value: values[key] || "", min, max, "aria-describedby": `${key}-help`, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValues({ ...values, [key]: e.target.value }) })}<span className="field-help" id={`${key}-help`}>{helper} (Min: {min}, Max: {max})</span></label>)}
          <div className="form-actions"><Button type="submit" disabled={state === "loading"}>{state === "loading" ? "Predicting..." : "Predict Performance"} <Icon name="spark" size="sm"/></Button><Button variant="secondary" onClick={() => { setValues({}); setState("empty"); setPrediction(null); }}>Reset form</Button></div>
        </form>
      </Card>
      <Card className={`result-card result-${state}`}>
        <div className="result-top"><div className="result-icon"><Icon name={state === "error" ? "info" : state === "unavailable" ? "database" : state === "success" ? "check" : "spark"} size="lg"/></div><Badge tone={state === "error" ? "warning" : state === "success" ? "success" : "neutral"}>{state === "empty" ? "No prediction yet" : state === "loading" ? "Processing" : state === "error" ? "Input required" : state === "success" ? "Prediction complete" : "Model unavailable"}</Badge></div>
        <div className="heading-lg">{state === "empty" ? "Prediction Result" : state === "loading" ? "Running Model" : state === "error" ? "Check your inputs" : state === "success" ? "Estimated Result" : "Model not connected"}</div>
        <div className="result-placeholder">{state === "success" && prediction !== null ? prediction.lr : "—"} <span>/ 100</span></div>
        <div className="body-muted">{state === "empty" ? "Complete the academic information form to generate a prediction." : state === "loading" ? "Sending inputs to FastAPI backend..." : state === "error" ? "Complete all five proposed input fields before continuing." : state === "success" ? `Linear Regression predicts ${prediction?.lr}. (Decision Tree predicts ${prediction?.dt}).` : "Inputs are valid, but no trained model is connected. No result has been fabricated."}</div>
        <div className="result-divider"/><div className="result-meta"><span>Model</span><strong>{state === "success" ? "LR & DT Ensemble" : "Not available"}</strong></div><div className="result-meta"><span>Feature set</span><strong>{state === "success" ? "5 academic features" : "Proposed · unverified"}</strong></div>
        <div className="info-callout"><Icon name="info" size="sm"/><span>A prediction is an estimate based on input features and a verified trained model. It does not guarantee future results.</span></div>
      </Card>
    </div>
    {state === "success" && prediction !== null && analytics && (
      <div style={{ marginTop: 'var(--space-8)' }}>
        <SectionTitle title="Prediction Context" subtitle="See how this student's predicted performance compares to the historical dataset." action={<Badge tone="success">Contextual Analysis</Badge>} />
        <div className="analytics-grid">
          <Card className="chart-card">
            <SectionTitle title="Attendance vs Marks" subtitle="The entered attendance highlighted against historical records." />
            <div className="chart-visual scatter">
              {analytics.attendance_vs_marks.map((pt: any, i: number) => <span key={i} style={{left: `${pt.x}%`, bottom: `${pt.y}%`}}/>)}
              <span style={{left: `${values.attendance}%`, bottom: `${prediction.lr}%`, backgroundColor: 'var(--amber)', border: '2px solid var(--amber-soft)', width: '12px', height: '12px', zIndex: 10}} title={`Predicted: ${prediction.lr} marks`} />
              <div className="chart-axis axis-y">Final marks</div>
              <div className="chart-axis axis-x">Attendance %</div>
            </div>
          </Card>
          <Card className="chart-card">
            <SectionTitle title="Study Hours vs Marks" subtitle="The entered study hours highlighted against historical records." />
            <div className="chart-visual scatter">
              {analytics.study_vs_marks.map((pt: any, i: number) => <span key={i} style={{left: `${(pt.x/15)*100}%`, bottom: `${pt.y}%`}}/>)}
              <span style={{left: `${(Number(values.hours)/15)*100}%`, bottom: `${prediction.lr}%`, backgroundColor: 'var(--amber)', border: '2px solid var(--amber-soft)', width: '12px', height: '12px', zIndex: 10}} title={`Predicted: ${prediction.lr} marks`} />
              <div className="chart-axis axis-y">Final marks</div>
              <div className="chart-axis axis-x">Study Hours</div>
            </div>
          </Card>
        </div>
      </div>
    )}
  </>;
}

function StudentsPage() {
  const [students, setStudents] = useState<any[] | null>(null);

  React.useEffect(() => {
    fetch(`${API_URL}/api/students`)
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(console.error);
  }, []);

  return <><PageHeader title="Students" subtitle="View anonymous academic records used by the application." badge="Connected Dataset"/><Card><SectionTitle title="Student records" subtitle="Showing 50 records from the synthesized dataset of 1500 total records."/>
  {!students ? (
    <div className="empty-state"><div className="empty-icon large"><Icon name="users" size="lg"/></div><div className="heading-md">Loading Records...</div><div className="body-muted">Fetching from the backend.</div><Badge tone="neutral">Please wait</Badge></div>
  ) : (
    <div style={{overflowX: 'auto'}}>
      <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse', fontSize: '12px'}}>
        <thead>
          <tr style={{borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)'}}>
            <th style={{padding: '12px 8px'}}>Attendance</th>
            <th style={{padding: '12px 8px'}}>Study Hours</th>
            <th style={{padding: '12px 8px'}}>Previous Marks</th>
            <th style={{padding: '12px 8px'}}>Assignment</th>
            <th style={{padding: '12px 8px'}}>Internal</th>
            <th style={{padding: '12px 8px'}}>Final Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i} style={{borderBottom: '1px solid rgba(255,255,255,0.05)'}}>
              <td style={{padding: '12px 8px'}}>{s.Attendance}%</td>
              <td style={{padding: '12px 8px'}}>{s.Study_Hours}h</td>
              <td style={{padding: '12px 8px'}}>{s.Previous_Marks}</td>
              <td style={{padding: '12px 8px'}}>{s.Assignment_Marks}</td>
              <td style={{padding: '12px 8px'}}>{s.Internal_Marks}</td>
              <td style={{padding: '12px 8px', fontWeight: 'bold', color: 'var(--blue)'}}>{s.Final_Marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
  </Card></>;
}

const charts = [
  ["Marks Distribution", "Distribution of final marks in the connected dataset.", "bars"],
  ["Attendance vs Final Marks", "Explore association without implying causation.", "scatter"],
  ["Study Hours vs Final Marks", "Compare study time with observed marks.", "scatter"],
  ["Feature Relationships", "A correlation view, when statistically meaningful.", "heat"],
] as const;

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<any>(null);

  React.useEffect(() => {
    fetch(`${API_URL}/api/analytics`)
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(console.error);
  }, []);

  return <><PageHeader title="Academic Analytics" subtitle="Explore patterns in student academic performance." badge={analytics ? "Live Data" : "Actual dataset required"}/><div className="analytics-note"><Icon name="info"/><div><strong>Data integrity first</strong><span>Charts below are structured empty states. They will display only values calculated from the connected dataset.</span></div></div>
  <div className="analytics-grid">
    {charts.map(([title, subtitle, type]) => <Card className="chart-card" key={title}><SectionTitle title={title} subtitle={subtitle} action={<Badge>{analytics ? "Live data" : "Awaiting data"}</Badge>}/>
    {analytics ? (
       type === "bars" ? <div className="chart-visual bars">{analytics.distribution.counts.map((c: number, i: number) => <span key={i} style={{height: `${(c/Math.max(...analytics.distribution.counts))*100}%`}} title={analytics.distribution.labels[i]}/>)}<div className="chart-axis axis-y">Students</div><div className="chart-axis axis-x">Marks range</div></div> :
       type === "scatter" && title.includes("Attendance") ? <div className="chart-visual scatter">{analytics.attendance_vs_marks.map((pt: any, i: number) => <span key={i} style={{left: `${pt.x}%`, bottom: `${pt.y}%`}}/>)}<div className="chart-axis axis-y">Final marks</div><div className="chart-axis axis-x">Attendance %</div></div> :
       type === "scatter" && title.includes("Study") ? <div className="chart-visual scatter">{analytics.study_vs_marks.map((pt: any, i: number) => <span key={i} style={{left: `${(pt.x/15)*100}%`, bottom: `${pt.y}%`}}/>)}<div className="chart-axis axis-y">Final marks</div><div className="chart-axis axis-x">Study Hours</div></div> :
       <EmptyChart type={type}/>
    ) : <EmptyChart type={type}/>}
    </Card>)}
  </div></>;
}

function ModelPage() {
  const [metricsData, setMetricsData] = useState<any>(null);

  React.useEffect(() => {
    fetch(`${API_URL}/api/model-metrics`)
      .then(res => res.json())
      .then(data => setMetricsData(data))
      .catch(console.error);
  }, []);

  const lr_metrics = metricsData ? metricsData.linear_regression : null;
  const dt_metrics = metricsData ? metricsData.decision_tree : null;

  const metrics = [
    ["MAE", "Mean absolute error", lr_metrics ? lr_metrics.mae.toFixed(2) : "—"],
    ["MSE", "Mean squared error", lr_metrics ? lr_metrics.mse.toFixed(2) : "—"],
    ["RMSE", "Root mean squared error", lr_metrics ? lr_metrics.rmse.toFixed(2) : "—"],
    ["R²", "Explained variance", lr_metrics ? lr_metrics.r2.toFixed(4) : "—"]
  ];

  const dt_metrics_list = [
    ["MAE", "Mean absolute error", dt_metrics ? dt_metrics.mae.toFixed(2) : "—"],
    ["RMSE", "Root mean squared error", dt_metrics ? dt_metrics.rmse.toFixed(2) : "—"],
    ["R²", "Explained variance", dt_metrics ? dt_metrics.r2.toFixed(4) : "—"]
  ];

  return <><PageHeader title="Model Insights" subtitle="Understand how the prediction model is evaluated." badge={metricsData ? "Models Verified" : "Model not verified"}/>
    <Card><SectionTitle title="Model Information" subtitle="Technical details will populate from the serialized model and training pipeline."/>
      <div className="model-info-grid">{[["Primary Model", metricsData ? "Linear Regression" : "Not available"],["Secondary Model", metricsData ? "Decision Tree" : "Not available"],["Prediction target","Final Marks"],["Input features", metricsData ? "5 variables" : "Not verified"],["Training status", metricsData ? "Trained & Saved" : "Awaiting model"]].map(([key,value])=><div className="model-info" key={key}><span>{key}</span><strong>{value}</strong></div>)}</div>
    </Card>
    
    <div style={{marginTop: 'var(--space-6)'}}>
      <SectionTitle title="Primary Model (Linear Regression) Metrics" />
      <div className="metric-eval-grid">{metrics.map(([name, desc, value])=><Card className="eval-card" key={name}><div className="eval-name">{name}</div><div className="eval-value">{value}</div><div className="supporting">{desc}</div><Badge tone={metricsData ? "success" : "neutral"}>{metricsData ? "Calculated" : "Not calculated"}</Badge></Card>)}</div>
    </div>

    <div style={{marginTop: 'var(--space-6)'}}>
      <SectionTitle title="Secondary Model (Decision Tree) Metrics" />
      <div className="metric-eval-grid dt-grid">{dt_metrics_list.map(([name, desc, value])=><Card className="eval-card" key={name}><div className="eval-name">{name}</div><div className="eval-value">{value}</div><div className="supporting">{desc}</div><Badge tone={metricsData ? "info" : "neutral"}>{metricsData ? "Calculated" : "Not calculated"}</Badge></Card>)}</div>
    </div>

    <div className="two-column"><Card><SectionTitle title="How the Model Works"/><div className="prose">The system trains two models: a Linear Regression (primary, easy to explain) and a Decision Tree (optional secondary) using the dataset. They learn patterns between features like attendance and study hours against the target (Final Marks). The predictions are combined/compared to estimate unseen examples.</div></Card><Card><SectionTitle title="Model Limitations"/><ul className="limitations"><li>Predictions depend on dataset quality and representativeness.</li><li>The model does not guarantee future academic results.</li><li>Results may not generalize beyond the training dataset.</li><li>Predictions should not be the sole basis for academic decisions.</li></ul></Card></div>
  </>;
}

function AboutPage() {
  const workflow = ["Student Academic Data", "Data Preprocessing", "Model Training", "Model Evaluation", "Performance Prediction"];
  return <><PageHeader title="About Project" subtitle="A transparent overview for faculty review and academic presentation." badge="Academic Mini Project"/>
    <Card className="about-hero"><div><Badge tone="info">VERSION 1.0 · THIRD YEAR B.E. IT</Badge><div className="heading-xl">Student Performance Prediction Using Machine Learning</div><div className="body-muted">A focused academic application demonstrating how machine learning can estimate student performance from relevant, non-sensitive academic features.</div></div><div className="about-mark"><Icon name="cap" size="lg"/></div></Card>
    <div className="two-column"><Card><SectionTitle title="Project Overview"/><div className="prose">The project explores a supervised machine learning workflow for estimating final academic marks. Its purpose is educational: preprocessing data, training a model, evaluating it responsibly, and presenting estimates clearly.</div></Card><Card><SectionTitle title="Objectives"/><ul className="limitations"><li>Prepare and understand an academic dataset.</li><li>Train and evaluate a suitable regression model.</li><li>Provide a simple, explainable prediction workflow.</li><li>Communicate limitations without overstating results.</li></ul></Card></div>
    <Card><SectionTitle title="Machine Learning Workflow" subtitle="The final implementation should update this workflow if the training pipeline differs."/><div className="workflow">{workflow.map((step,i)=><React.Fragment key={step}><div className="workflow-step"><span>{i+1}</span><strong>{step}</strong></div>{i<workflow.length-1&&<Icon name="arrow"/>}</React.Fragment>)}</div></Card>
    <div className="two-column"><Card><SectionTitle title="Technology Stack"/><div className="tech-list">{["Python","Streamlit","Pandas & NumPy","Scikit-learn","Matplotlib","Joblib"].map(x=><Badge key={x}>{x}</Badge>)}</div></Card><Card><SectionTitle title="Scope & future direction"/><div className="prose">The initial scope is dataset exploration, regression-based prediction, and evaluation. Future work may include better explainability and deployment hardening, but only after the core model is validated.</div></Card></div>
  </>;
}

export default function App() {
  const [page, setPage] = useState<Page>("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const content = useMemo(() => {
    if (page === "Dashboard") return <Dashboard navigate={setPage}/>;
    if (page === "Predict Performance") return <PredictPage/>;
    if (page === "Students") return <StudentsPage/>;
    if (page === "Analytics") return <AnalyticsPage/>;
    if (page === "Model Insights") return <ModelPage/>;
    return <AboutPage/>;
  }, [page]);
  return <div className="app-shell">
    <Sidebar page={page} setPage={setPage} open={menuOpen} close={() => setMenuOpen(false)}/>
    {menuOpen && <div className="scrim" onClick={() => setMenuOpen(false)}/>}
    <main className="main-content"><div className="mobile-bar"><Button variant="ghost" onClick={() => setMenuOpen(true)}><Icon name="menu"/></Button><div className="mobile-brand"><div className="brand-mark"><Icon name="cap" size="sm"/></div>EduPredict</div><Badge>v1.0</Badge></div><div className="content-wrap">{content}</div></main>
  </div>;
}
